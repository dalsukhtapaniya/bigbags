export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (pre-flight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Log request details for debugging
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  if (req.method === 'POST') {
    try {
      // For now, just return a success message
      return res.status(200).json({ 
        message: 'API endpoint reached successfully',
        method: req.method,
        time: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    console.log(`Method ${req.method} not allowed`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: `Method ${req.method} Not Allowed`,
      allowedMethods: ['POST']
    });
  }
};
