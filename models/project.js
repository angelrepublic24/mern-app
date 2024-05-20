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
    
    image: {
        type: String,
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Number
    }

},{
    timestamps: true,
})

module.exports = model('Project', ProjectSchema, "projects")