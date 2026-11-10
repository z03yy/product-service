const crypto = require('crypto');

const requestLogger = (req, res, next) => {
    // Generate a unique ID for this request
    const requestId = crypto.randomUUID();

    // Attach it to the request object so other routes can see it
    req.requestId = requestId;

    // Log the start of the request
    console.log(`[${new Date().toISOString()}] [ID:${requestId}] ${req.method} ${req.url}`);

    // Set a header so the client knows the ID too
    res.setHeader('X-Request-Id', requestId);

    next();
};

module.exports = requestLogger;