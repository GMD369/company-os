from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_jwt_secret: str = ""
    postgres_dsn: str = ""
    ai_services_url: str = "http://localhost:8001"

    class Config:
        env_file = ".env"


settings = Settings()
