const express = require('express');
const path = require('path');
require('dotenv').config()
const helmet = require('helmet');
const { Sequelize } = require('sequelize');

// const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/posts');
// const commentaireRoutes = require('./routes/commentaire');

const sequelize = new Sequelize(process.env.DB_URL, {database:"mydb"});
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) =>
    console.error('Unable to connect to the database:', error)
)

const app = express();
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, "images")));

// app.use('/api/auth', userRoutes);
// app.use('/api/posts', saucesRoutes);

module.exports = app;