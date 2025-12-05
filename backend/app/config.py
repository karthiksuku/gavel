from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # App
    app_name: str = "Gavel API"
    app_version: str = "2.0.0"
    debug: bool = False

    # Oracle ADB
    oracle_user: str = "AIUSER"
    oracle_password: str = "GPb8fE7wUVtGxVa"
    oracle_dsn: str = "aidemo_high"
    oracle_config_dir: str = "/home/ubuntu/.oci/wallets/AIDEMO_wallet"
    oracle_wallet_location: str = "/home/ubuntu/.oci/wallets/AIDEMO_wallet"
    oracle_wallet_password: str = "Welcome1!Welcome1!"

    # GenAI - Grok-4
    genai_base_url: str = "http://207.211.146.68:8088/v1"
    genai_api_key: str = "ocigenerativeai"
    genai_model: str = "xai.grok-4"
    genai_secondary_url: str = "http://207.211.146.68:8090/v1"
    genai_secondary_key: str = "ocigenerativeai"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
