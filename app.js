// 1. Setup & Imports
const express = require('express');
const dotenv = require('dotenv');
const requestLogger = require('./middleware/logger');
const productRoutes = require('./routes/products'); // Import the module

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// 2. Essential Middleware
app.use(express.json());    // Required for POST/PUT to work
app.use(requestLogger);     // Required for Observability (Correlation IDs)

// 3. Routes
// Any request to /api/products will be handled by productRoutes
app.use('/api/products', productRoutes);

// 4. Error Handling (Optional but recommended add-on)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`${process.env.SERVICE_NAME} running on http://localhost:${port}`);
});