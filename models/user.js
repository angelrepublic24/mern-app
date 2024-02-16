const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    create_at: {
        type: Date,
        default: Date.now
    }

})
UserSchema.methods.toJSON = function(){
    let users = this;
    let userObject = users.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = model('User', UserSchema);
