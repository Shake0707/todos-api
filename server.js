import express from 'express';
import router from './router.js';
import mongoose from 'mongoose';
import cors from 'cors';

const whitelist = ['https://todos-c3yp.onrender.com'];

const app = express();

const PORT = 8080;
const DB_URL = "mongodb+srv://shaxriyor:IWDnGduokssZUpUG@todo.fqlpkjf.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());

app.options('*', cors());

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use('/api', router);

const consoleColor = "\x1b[34m";

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        app.listen(PORT, () => console.log(consoleColor, `http://localhost:${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

startApp();