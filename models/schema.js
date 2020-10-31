const mongoose = require("mongoose")

// validate it is number
// validate if the value has been passed
// find by id --> document then the id is found else --> you may use this id
const nameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color:{
        type: String,
        trim: true,
        required: true,
        uppercase: true
    }
},{ collection: 'budget' })

module.exports = mongoose.model('budget', nameSchema)