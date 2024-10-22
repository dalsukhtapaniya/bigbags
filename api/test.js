export default function handler (req, res) {
    res.status(200).json({ 
        message: 'Hello from API!',
        method: req.method,
        time: new Date().toISOString()
    });
};
