const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/book-routes');
const routers = require('./routes/user-routes');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
// app.use(express.urlencoded());x
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/books", router);
app.use("/", routers);


mongoose.set("strictQuery", false);
mongoose.connect(
    "mongodb+srv://Shubham:Shubh165!@cluster0.ubde2n2.mongodb.net/Store?retryWrites=true&w=majority"
).then(() => console.log("Connected to Database"))
.then(() =>{
    app.listen(8000);
}).catch((err) => console.log(err));



