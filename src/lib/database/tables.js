export default { 
    users: `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        salt TEXT NOT NULL,
        role TEXT DEFAULT 'USER',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    demographics: `CREATE TABLE IF NOT EXISTS demographics (
        id INTEGER PRIMARY KEY,
        age INTEGER,
        gender TEXT,
        ethnicity TEXT,
        education TEXT,
        employment TEXT
    )`,
    households: `CREATE TABLE IF NOT EXISTS households (
        id INTEGER PRIMARY KEY,
        size INTEGER,
        type TEXT,
        owner BOOL,
        address TEXT
    )`,
    responses: `CREATE TABLE IF NOT EXISTS responses (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        house_id INTEGER NOT NULL,
        demo_id INTEGER NOT NULL,
        last_updated TIMESTAMP,
        submission_date TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(house_id) REFERENCES houses(id),
        FOREIGN KEY(demo_id) REFERENCES demographics(id)
    )`,
    audit_logs: `CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        action TEXT,
        ip_address TEXT,
        date TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`,
    access_controls: `CREATE TABLE IF NOT EXISTS access_controls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT,
        resource TEXT,
        permission TEXT
    )`,
};