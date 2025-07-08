# 🧠 `NewsSummary` – Query-Aware Financial News Summarizer

The `NewsSummary` class provides an intelligent pipeline to fetch and summarize financial news based on a user query using LangChain, Google Gemini (`gemini-2.0-flash`), and Tavily.

---

## ✅ Pipeline Logic

### 1. **Query Refinement**
- Accepts conversation history and the latest user message.
- Uses an LLMChain (`self.query_chain`) to turn the input into a high-precision search query.
- Example prompt:
  > "Refine this user query into a high-precision web search query..."

### 2. **Search Results Retrieval**
- Uses `TavilySearchResults` tool to perform the web search based on the refined query.
- Extracts URLs of top results.

### 3. **Web Document Loading**
- Loads full HTML content of the retrieved URLs using `WebBaseLoader`.
- Converts them into `Document` objects for downstream processing.

### 4. **Query-Aware Summarization (Map-Reduce)**
- Utilizes LangChain’s `load_summarize_chain` with `map_reduce` strategy.
  
#### 🔸 Map Prompt
- Each chunk of the document is summarized **in context of the query**.
- Irrelevant details are skipped.

#### 🔸 Reduce Prompt
- Aggregates all chunk summaries into a final, focused answer relevant to the query.

---

## ⚙️ Key Methods

- `generate_query(history, latest_message)`  
  → Returns a refined search query based on user input.

- `search_with_agent(query)`  
  → Returns list of URLs from Tavily based on refined query.

- `load_documents(urls)`  
  → Loads and returns parsed documents from given URLs.

- `handle_news_summary(history, latest_message)`  
  → Orchestrates the entire pipeline: query → search → load → summarize.

---

## 📝 Example Output

```python
[
  "User: What's the latest update on Paytm's financial situation?",
  ...
]

→ "Paytm received a FEMA violation notice regarding past acquisitions. The company also expanded international UPI support..."




# 🧠 Financial News Summarizer

This system intelligently summarizes financial news based on a user's query by combining web search, document loading, and LLM-powered summarization. It is implemented using **LangChain**, **Google Gemini (`gemini-2.0-flash`)**, and **Tavily Search**.

---

## 📌 Objective

To build a **context-aware**, **query-guided** pipeline that:
1. Refines vague user questions into focused web search queries.
2. Searches and retrieves **real-time, relevant financial articles**.
3. Downloads and parses web content.
4. Summarizes it in a **concise, query-specific** manner using LLMs.

---

## 🧰 Tech Stack

| Layer            | Tool / Library                                | Purpose                                      |
|------------------|------------------------------------------------|----------------------------------------------|
| LLM              | `Google Gemini` via `langchain_google_genai`  | Used for query refinement and summarization  |
| Framework        | `LangChain`                                    | Manages chains, prompts, and orchestration   |
| Web Search       | `TavilySearchResults`                          | Searches for top-k URLs related to a query   |
| Document Loading | `WebBaseLoader` from `langchain_community`     | Loads HTML content from URLs as documents    |
| Summarization    | `load_summarize_chain` (`map_reduce`)          | Summarizes documents in chunks and combines  |
| Configuration    | `dotenv`                                       | For managing API keys / credentials          |

---

## 🔄 System Architecture & Pipeline

### 1. **Query Understanding and Refinement**
- Uses a custom `LLMChain` with a structured prompt.
- Takes user history and latest message to craft a **high-precision search query**.
- This ensures relevance and removes ambiguity in search.

### 2. **Web Search Tool Integration**
- Invokes `TavilySearchResults` (a LangChain tool).
- Returns the **top 10 most relevant URLs** matching the refined query.

### 3. **Document Acquisition**
- URLs are passed to `WebBaseLoader`, which:
  - Downloads web pages.
  - Extracts meaningful content.
  - Converts each page into LangChain-compatible `Document` objects.

### 4. **Query-Aware Summarization**
- Leverages LangChain’s `map_reduce` summarization method:
  
  **Map Phase:**
  - Each document chunk is summarized **with the query in mind**.
  - Unrelated content is ignored.

  **Reduce Phase:**
  - Combines all partial summaries into one final answer.
  - Focuses only on query-relevant insights and discards fluff.

---

## 🧠 Design Philosophy

- **LLM-Oriented Reasoning**: Query refinement, document evaluation, and summarization all rely on prompt-engineered LLM steps.
- **Composable Pipelines**: Each stage is modular, enabling flexible reuse (e.g., replacing the search tool or LLM).
- **Non-LLM + LLM Integration**: Bridges traditional tools (web scraping, search APIs) with LLMs seamlessly.
- **Query-Aware Processing**: Summarization isn't generic — it's always guided by the user’s intent.

---

## 📦 Core Components

| Class / Chain        | Description                                                   |
|----------------------|---------------------------------------------------------------|
| `NewsSummary`        | Main orchestrator of the entire pipeline                      |
| `self.query_chain`   | Refines search queries from chat history                      |
| `self.search_tool`   | Tavily-powered tool to get real-time financial news URLs      |
| `load_documents()`   | Extracts and parses article text                              |
| `self.summarizer`    | Custom map-reduce summarizer guided by user query             |
| `handle_news_summary()` | Integrates all components and returns final output         |

---

## 🧪 Example Use Case

> "What’s the latest update on RBI’s digital currency plans?"

- The model refines this to: `"RBI digital currency July 2025 site:economicstimes.indiatimes.com"`
- It fetches 10 URLs from Tavily
- Downloads relevant documents
- Summarizes based on the original query
- Returns a tight, relevant answer

---

## 🔐 API Requirements

- **Google Gemini API key** (set via `.env`)
- **Tavily API key** (also from `.env`)

---

## 📍 Final Note

This system provides a **production-ready pipeline** for real-time, LLM-guided financial news understanding. It can be extended to other domains, or enhanced by:
- Adding RAG-based memory
- Integrating with vector databases for context
- Enabling user feedback or scoring

---









Spearheaded the development of an AI-powered financial assistant platform enabling users to query stock data, clarify financial concepts, and generate dynamic reports via natural language.

Engineered a modular backend using Flask and integrated LangChain agents for orchestrating tools like stock lookup, financial math, web search, and retrieval-augmented generation (RAG).

Designed custom LangChain tools for real-time stock data using yfinance, company ticker resolution, arithmetic evaluation, and DuckDuckGo-powered financial web search.

Implemented concept clarification and semantic search using FAISS-backed vector stores and retrieval pipelines, enhancing accuracy in financial term explanation.

Built robust web scraping and content extraction tools using requests and BeautifulSoup to summarize external financial news and webpages on demand.

Developed a responsive frontend in Next.js with Tailwind CSS, Lucide icons, and markdown rendering, supporting multi-step report feedback and live chat with the AI assistant.

Enabled end-to-end data flow from user input to LLM response using React hooks and Flask APIs, ensuring real-time communication and seamless user experience.