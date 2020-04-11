const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send({ success: true, data: user });
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

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
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h'})
            res.status(200).send({ userId: user._id,  token })            
        }
    } catch (e) {
        res.status(400).send(e)
    }
}