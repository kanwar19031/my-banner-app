CREATE DATABASE banner_db;

USE banner_db;

CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    is_visible BOOLEAN DEFAULT FALSE,
    description TEXT,
    timer INT,
    link VARCHAR(255)
);

select * from banners;
