const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./database/sequelize');
const router = require('./routes');

require('./database/associations');

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);


app.listen(port, () => {
    console.log(`server en el puerto ${port}`);
    sequelize.sync({ force: false }).then(() => {
        console.log('Database & tables created!');
    });
});