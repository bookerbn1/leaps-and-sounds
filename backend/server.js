const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const sessionsRouter = require('./routes/sessions');
const therapistsRouter = require('./routes/therapists');
const clientsRouter = require('./routes/clients');


app.use('/sessions', sessionsRouter);
app.use('/therapists', therapistsRouter);
app.use('/clients', clientsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
