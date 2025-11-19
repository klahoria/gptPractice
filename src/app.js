import express from 'express';
import morgan from "morgan";

const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('<h2 style="color: green;">Hello</h2>')
})

app.get('/favicon.ico', (req, res) => {
    return 'hello'
})


export default app;