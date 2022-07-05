import express, {Express} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import noteRoutes from './routes';
import bodyParser from "body-parser";

const app: Express = express();
const path = require('path');

const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(noteRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.coo28.mongodb.net/?retryWrites=true&w=majority`;

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    console.log('production')
    // if(true) {
    // Set static folder
    app.use(express.static('client'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
}

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error;
    });
