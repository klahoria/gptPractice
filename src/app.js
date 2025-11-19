import express from 'express';
import morgan from "morgan";
import route from './routes/users.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(morgan('dev'))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('<h2 style="color: green;">Hello</h2>')
})

app.get('/favicon.ico', (req, res) => {
    return 'hello'
})


app.use('/', route)

export default app;