const mongoose = require('mongoose')
const { Schema, model } = mongoose

const memberSchema = new Schema({
    name: String,
    age: Number,
    phone: String,
    email: String,
    message: String
}, { timestamps: true })

const Member = model('member', memberSchema)

module.exports = Member