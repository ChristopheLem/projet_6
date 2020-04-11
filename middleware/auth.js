const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
  
    if (req.body.userId && req.body.userId !== userId) {
     throw new Error('Non autorisé !');
    } 
      req.userId = userId;
      next();      
  } catch (e) {
    res.status(401).send({
      error: new Error('Invalid request!')
    });
  }
};