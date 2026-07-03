from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str = ""
    groq_api_key: str = ""
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: str = ""
    postgres_dsn: str = ""
    embedding_model_name: str = "all-MiniLM-L6-v2"
    qdrant_collection_name: str = "documents"
    gemini_model_name: str = "gemini-2.0-flash"
    groq_model_name: str = "llama-3.3-70b-versatile"
    llm_provider: str = "groq"

    class Config:
        env_file = ".env"


settings = Settings()
