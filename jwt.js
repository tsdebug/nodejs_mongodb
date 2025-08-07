const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next)=>{

    // First check require headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token not found'});
    // Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded; // Here user is a variable name for payload - can be set to any name doen't necessarily has to be 'user'
        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

// Function to generate JWT token
const generateToken = (userData) =>{
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 300000});
}

module.exports = {jwtAuthMiddleware, generateToken};
