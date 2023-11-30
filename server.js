import express from 'express';
import router from './router.js';
import mongoose from 'mongoose';
import cors from 'cors';

const whitelist = [
    "https://todos-api-x88y.onrender.com/api/todos",
    "https://shake0707.github.io/todos/"
];

const app = express();
app.use(express.json());
app.options('*', cors());

const PORT = 8080;
const DB_URL = "mongodb+srv://shaxriyor:IWDnGduokssZUpUG@todo.fqlpkjf.mongodb.net/?retryWrites=true&w=majority";

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api', router);

const consoleColor = "\x1b[34m";

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log(consoleColor, 'Server is started'));
    } catch (e) {
        console.log(e);
    }
}

startApp();