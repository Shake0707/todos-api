const express = require('express');
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.options('*', cors());

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://todos-api-x88y.onrender.com/api"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Alow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
});

const PORT = 8080;
const DB_URL = "mongodb+srv://shaxriyor:IWDnGduokssZUpUG@todo.fqlpkjf.mongodb.net/?retryWrites=true&w=majority";

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api', router);

const consoleColor = "\x1b[34m";

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        app.listen(PORT, () => console.log(consoleColor, 'Server is started'));
    } catch (e) {
        console.log(e);
    }
}

startApp();