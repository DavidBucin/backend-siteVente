const Advert = require("../models/advert");
const mongoose = require('mongoose')


const HttpErreur = require("../models/http-erreur");


const getAdverts = async (requete, reponse, next) => {
    let adverts;
    try {
        adverts = await Advert.find({},);
    } catch (err) {
        return next(
            new HttpErreur("Error when trying to get the advert", 500)
        );
    }
    reponse.json({
        adverts: adverts.map((adverts) =>
            adverts.toObject({ getters: true })
        ),
    });
};

const getAdvert = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such advert' })
    }

    const advert = await Advert.findById(id)

    if (!advert) {
        return res.status(404).json({ error: 'No such advert' })
    }

    res.status(200).json(advert)
}


const createAdvert = async (requete, res) => {
    const { type, price, name } = requete.body;


    let emptyFields = []

    if (!type) {
        emptyFields.push('type')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (!name) {
        emptyFields.push('name')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const advert = await Advert.create({ type, price, name });
        res.status(200).json(advert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAdvert = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such advert' })
    }

    const advert = await Advert.findOneAndDelete({ _id: id })

    if (!advert) {
        return res.status(400).json({ error: 'No such advert' })
    }

    res.status(200).json(advert)
}

const updateAdvert = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const advert = await Advert.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!advert) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(advert)
}

module.exports = {
    createAdvert,
    getAdverts,
    getAdvert,
    deleteAdvert,
    updateAdvert


}




