import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { sendEmailToBusiness } from './SendOrderEmail.js';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Connection (Supabase)
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// GET all data from allowed tables
app.get(`${baseUrl}/api/:table`, async (req, res) => {
  const { table } = req.params;
  const allowedTables = ['products', 'orders', 'order_items'];

  if (!allowedTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  try {
    const { rows } = await pool.query(`SELECT * FROM ${table}`);
    res.json(rows);
  } catch (error) {
    console.error(`Error fetching from table ${table}:`, error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

// INSERT into table
app.post(`${baseUrl}/api/insert`, async (req, res) => {
  const { table, data } = req.body;

  if (!table || typeof data !== 'object' || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Invalid table or data' });
  }

  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map((_, idx) => `$${idx + 1}`).join(', ');
  const values = Object.values(data);

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING id`;

  try {
    const result = await pool.query(sql, values);
    res.status(201).json({ message: 'Insert successful', insertId: result.rows[0].id });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ error: 'Insert failed', details: error.message });
  }
});

// Send Email
app.post(`${baseUrl}/api/send-email`, async (req, res) => {
  try {
    await sendEmailToBusiness(req.body);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('SRL Homefoods Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
