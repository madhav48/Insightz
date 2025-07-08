import os
import json
from langchain.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv(dotenv_path= "../.env")


def load_glossary_documents(folder_path):
    documents = []

    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            filepath = os.path.join(folder_path, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                term = data.get("term", "")
                definition = data.get("definition", "")
                if definition:
                    documents.append(Document(
                        page_content=definition,
                        metadata={"term": term}
                    ))

    return documents

def create_vector_store_from_documents(documents, save_path="glossary_index"):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_documents(documents, embeddings)
    vector_store.save_local(save_path)
    print(f"Saved vector store at {save_path}")
    return vector_store


if __name__ == "__main__":
    folder = "db/glossary"
    docs = load_glossary_documents(folder)
    create_vector_store_from_documents(docs)
