const express = require('express');
const path = require('path');
require('dotenv').config()

const userRoutes = require('./routes/user');
// const saucesRoutes = require('./routes/sauces');
const helmet = require('helmet');

// mongoose.connect(process.env.DB_URL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connexion à MongoDB réussie !'))
// .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet());

const db = require("./models");
db.sequelize.sync();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, "images")));

app.use('/api/auth', userRoutes);
// app.use('/api/sauces', saucesRoutes);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


module.exports = app;