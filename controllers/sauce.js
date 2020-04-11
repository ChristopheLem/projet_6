const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = async (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    try {
        await sauce.save();
        res.status(201).send({ message: "Objet créé !" })
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getSauces = async (req, res, next) => {
    try {
        const sauces = await Sauce.find();
        res.status(200).send(sauces)
    } catch (e) {
        res.status(500).send()
    }
}

exports.getSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findById(req.params.id)
        if (!sauce) {
            return res.status(404).send({ error: "Objet non trouvée"})
        }
        res.status(200).json(sauce)
    } catch (e) {
        res.status(500).send()
    }
}

exports.updateSauce = async (req, res) => {
    try {
        const sauceObject = req.file ?
        {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body};      
        await Sauce.findOneAndUpdate({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        res.status(200).send({ message: 'Objet modifié !'})        
    } catch(err) {
        res.status(400).send(err);   
    }
}

exports.deleteSauce = async (req, res) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id })
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
            await Sauce.deleteOne({ _id: req.params.id })   
        })
        res.status(200).send({ message: 'Objet supprimé !'})
    } catch (err) {
        res.status(500).send({ err });
    }
}