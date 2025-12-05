import oracledb
from contextlib import contextmanager
from app.config import get_settings

settings = get_settings()

# Initialize Oracle client
try:
    oracledb.init_oracle_client(config_dir=settings.oracle_config_dir)
except Exception:
    pass  # Already initialized

def get_connection():
    return oracledb.connect(
        user=settings.oracle_user,
        password=settings.oracle_password,
        dsn=settings.oracle_dsn,
        config_dir=settings.oracle_config_dir,
        wallet_location=settings.oracle_wallet_location,
        wallet_password=settings.oracle_wallet_password
    )

@contextmanager
def get_db():
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    """Initialize database tables if they don't exist"""
    with get_db() as conn:
        cursor = conn.cursor()
        # Check if tables exist, create if not
        try:
            cursor.execute("SELECT COUNT(*) FROM AIUSER.GAVEL_DOCUMENTS")
        except:
            # Tables don't exist, would create them here
            pass
