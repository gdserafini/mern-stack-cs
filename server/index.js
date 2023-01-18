import express from 'express';
import { connectDB } from './src/database/db.connect.js';

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());

app.listen(PORT, () => console.log(
    `Server running on port ${PORT}.`
));