import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/', (req, res) => {
    res.send('hello World');
})

app.listen(3000, () => {
    console.log('Connected to 3000');
})