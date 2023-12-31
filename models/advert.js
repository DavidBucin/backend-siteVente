const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const advertSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // Assuming price is a numeric value (double or integer)
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;
