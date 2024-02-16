const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connection = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
        console.log("database connection established")
    } catch (e) {
        console.log(e);
        throw new Error('could not connect to the database');
    }
}

module.exports = {connection}
// https://us-east-2.aws.data.mongodb-api.com/app/data-thvbn/endpoint/data/v1
// mongodb+srv://angelrepublic24:almonte2410@cluster0.amzmpik.mongodb.net/portfolio
