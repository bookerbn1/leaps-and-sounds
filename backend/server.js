const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({path: path.resolve(__dirname, '../backend/.env') });;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "https://csds132-leaps-and-sounds-backend.onrender.com)"],
})
);
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
mongoose.set('useFindAndModify', false)

const sessionsRouter = require('./routes/sessions');
const therapistsRouter = require('./routes/therapists');
const clientsRouter = require('./routes/clients');


app.use('/sessions', sessionsRouter);
app.use('/therapists', therapistsRouter);
app.use('/clients', clientsRouter);

/* server prodcution assets
if(process.env.NODE_ENV === "production")
app.use(express.static(path.join("../build")))
app.get("*", (req, res) => res.sendfile(path.resolve(__dirname, 'build', 'index.html')))
*/

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
