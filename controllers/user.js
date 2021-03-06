const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc crée un nouvel utilisateur
// @route POST /api/auth/signup
// @access Public
exports.signup = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send({ success: true, data: user });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

// @desc connecte utilisateur
// @route POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email});

        if (!user) {
            res.status(404).send({ success:false, error: "Utilisateur non trouvé" })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            return res.status(400).send({ error: "Mot de passe incorrect"})
        } else {
            const token = jwt.sign({ userId: user._id }, "SECRET", { expiresIn: '24h'})
            res.status(200).send({ userId: user._id,  token })            
        }
    } catch (e) {
        res.status(500).send(e)
    }
}