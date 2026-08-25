CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    repository VARCHAR(255),
    branch VARCHAR(100) DEFAULT 'main',
    status VARCHAR(50) DEFAULT 'Active',
    risk_score INT DEFAULT 0,
    owner_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);