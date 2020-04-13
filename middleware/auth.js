const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupère token depuis header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Décrypte le token
    const userId = decodedToken.userId; // Récupère la valeur de la propriété userId du token
  
    if (req.body.userId && req.body.userId !== userId) { 
     throw new Error('Non autorisé !');
    } 
      next();      
  } catch (e) {
    res.status(401).send({
      error: new Error('Invalid request!')
    });
  }
};