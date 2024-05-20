const {Schema, model, Types} = require('mongoose');
const User = require('./user')


const ProjectSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
    },
    lang: {
        type: [String],
    },
    url: {
        type: String,
    },
    date: {
        type: Number,
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps: true,
})

module.exports = model('Project', ProjectSchema, "projects")
