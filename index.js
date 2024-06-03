/* eslint-disable no-undef */
const {connection} = require('./databases/connection');
const express = require('express');
const cors = require('cors');
const path = require('path');

console.log('Running database connection');
connection()

const app = express();
const port = 3200;
const options = {
    origin: ["http://82.197.95.210/", "https://82.197.95.210/"]
}

app.use(cors(options));

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// routes
const route_user = require('./router/userRoute');
const route_project = require('./router/projectRoute');


// Uploaded routes
app.use('/', express.static('dist', {redirect: false}));
app.use("/api/user", route_user);
app.use("/api/project", route_project)

app.get("*", (req, res, next) => {
    return res.sendFile(path.resolve('dist/index.html'));
})

app.listen(port, () => {
    console.log('Port listening on port ' + port);
});
