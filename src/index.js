import express from 'express';
import { router } from './routes/router.js';
import { db } from './config/db.js';

const SERVER_PORT = process.env.SERVER_PORT;

db.sequelize.authenticate()
    .then(() => {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(router);  
        
        app.listen(SERVER_PORT, console.log(`Server listening on port ${SERVER_PORT}`));

    }).catch(error => console.log(error));


