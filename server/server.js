import express from 'express';
import { createConnection } from 'mysql2/promise';
import cors from 'cors';
import { sendEmailToBusiness } from './SendOrderEmail.js'; 

const app = express();
app.use(cors());
app.use(express.json());

// Create DB connection
const db = await createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mvj$0610',   // your db password
  database: 'myapp',
});

// // API endpoint to get data
app.get('/api/:table', async (req, res) => {
  const { table } = req.params;

  // Optional: Validate table name against allowed list to avoid SQL injection
  const allowedTables = ['products', 'orders', 'order_items'];
  if (!allowedTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  try {
    const [rows] = await db.query(`SELECT * FROM \`${table}\``);
    res.json(rows);
  } catch (error) {
    console.error(`Error fetching from table ${table}:`, error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});



app.post('/api/insert', async (req, res) => {
  const { table, data } = req.body;

  if (!table || typeof data !== 'object' || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Invalid table or data' });
  }

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const sql = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;

  try {
    const [result] = await db.query(sql, values);
    res.status(201).json({ message: 'Insert successful', insertId: result.insertId });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ error: 'Insert failed', details: error.message });
  }
});


app.post('/api/send-email', async (req, res) => {
  try {
    await sendEmailToBusiness(req.body); // calling function from sendOrderEmail.js
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error); // full error output
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
