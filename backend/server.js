require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// connect db
connectDB();

// middleware
app.use(express.json());

// ✅ Fix: configure CORS properly
app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    credentials: true,               // allow cookies / auth headers
  })
);

app.use(morgan('dev'));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

// health route
app.get('/', (req, res) => res.send('API running'));

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
