import os
import time
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from collections import deque

BASE_URL = "https://www.investopedia.com/terms"
ALLOWED_DOMAIN = "investopedia.com"
GLOSSARY_DIR = os.path.join("db", "glossary")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

def sanitize_filename(name):
    return "".join(c for c in name if c.isalnum() or c in ("-", "_")).rstrip()

def get_html(url):
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"[ERROR] Failed to fetch {url}: {e}")
        return ""

def extract_definition(html):
    soup = BeautifulSoup(html, "html.parser")
    title_tag = soup.find("h1")
    paragraphs = soup.find_all("p")
    
    title = title_tag.get_text(strip=True) if title_tag else "Unknown Term"
    content = "\n\n".join(p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 30)

    return title, content

def crawl_glossary_links(base_url, max_depth=2, max_pages=500):
    to_crawl = deque([(base_url, 0)])
    crawled = set()
    glossary_links = set()

    while to_crawl and len(glossary_links) < max_pages:
        url, depth = to_crawl.popleft()
        if url in crawled or depth > max_depth:
            continue

        print(f"[CRAWLING] {url}")
        html = get_html(url)
        if not html:
            continue

        soup = BeautifulSoup(html, "html.parser")
        for link in soup.find_all("a", href=True):
            href = link["href"]
            full_url = urljoin(BASE_URL, href)
            parsed = urlparse(full_url)

            if ALLOWED_DOMAIN in parsed.netloc and full_url not in crawled:
                glossary_links.add(full_url)
                to_crawl.append((full_url, depth + 1))

        crawled.add(url)

    return list(glossary_links)

def scrape_and_save(url):
    html = get_html(url)
    if not html:
        return

    term, definition = extract_definition(html)
    if not definition:
        print(f"[SKIP] No valid definition found for {url}")
        return

    filename = sanitize_filename(term.lower().replace(" ", "_")) + ".json"
    save_path = os.path.join(GLOSSARY_DIR, filename)
    os.makedirs(GLOSSARY_DIR, exist_ok=True)

    data = {
        "term": term,
        "definition": definition,
        "url": url
    }

    with open(save_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"[✓] Saved '{term}' to {save_path}")

def main():
    print("[INFO] Starting glossary crawl from Investopedia...")

    STARTING_GLOSSARY_PAGES = [
        f"https://www.investopedia.com/terms/{chr(i)}/" for i in range(ord("a"), ord("z") + 1)
        ]

    glossary_links = set()
    for url in STARTING_GLOSSARY_PAGES:
        glossary_links.update(crawl_glossary_links(url, max_depth=1))
        break

    print(f"\n[INFO] Found {len(glossary_links)} glossary links.\n")

    for url in glossary_links:
        scrape_and_save(url)

if __name__ == "__main__":
    main()
