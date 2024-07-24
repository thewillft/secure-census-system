export default { 
    users: `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'USER',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    demographics: `CREATE TABLE IF NOT EXISTS demographics (
        id TEXT PRIMARY KEY,
        age INTEGER,
        gender TEXT,
        ethnicity TEXT,
        education TEXT,
        employment TEXT
    )`,
    households: `CREATE TABLE IF NOT EXISTS households (
        id TEXT PRIMARY KEY,
        size INTEGER,
        type TEXT,
        owner BOOL,
        address TEXT
    )`,
    responses: `CREATE TABLE IF NOT EXISTS responses (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        house_id TEXT NOT NULL,
        demo_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(house_id) REFERENCES houses(id),
        FOREIGN KEY(demo_id) REFERENCES demographics(id)
    )`,
    audit_logs: `CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        action TEXT,
        target TEXT,
        ip_address TEXT,
        date TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`,
    access_controls: `CREATE TABLE IF NOT EXISTS access_controls (
        id TEXT PRIMARY KEY,
        role TEXT,
        resource TEXT,
        permission TEXT
    )`,
    encryption_keys: `CREATE TABLE IF NOT EXISTS encryption_keys (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        aes_key TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`,
};