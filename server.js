const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; // Use environment variable if available

// Database Connection (using environment variables)
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Kanwar@123',
    database: process.env.DB_DATABASE || 'banner_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        // Handle error gracefully, e.g., exit the process
    } else {
        console.log('Connected to the MySQL database.');
    }
});

app.use(bodyParser.json());
app.use(cors());

// API Endpoints
app.get('/api/banner', (req, res) => {
    try {
        db.query('SELECT * FROM banners WHERE id = 1', (err, result) => {
            if (err) {
                console.error('Error fetching banner data:', err);
                res.status(500).json({ error: 'Failed to fetch banner data' });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error('Error in /api/banner endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/banner', (req, res) => {
    try {
        const { description, timer, link } = req.body;
        // Validate data here (e.g., using a validation library)

        const sql = `UPDATE banners SET description = ?, timer = ?, link = ? WHERE id = 1`;
        db.query(sql, [description, timer, link], (err, result) => {
            if (err) {
                console.error('Error updating banner data:', err);
                res.status(500).json({ error: 'Failed to update banner data' });
            } else {
                res.json({ message: 'Banner updated successfully' });
            }
        });
    } catch (error) {
        console.error('Error in /api/banner endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... (Other API endpoints for toggling visibility)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});