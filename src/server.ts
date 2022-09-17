import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { fetchAllRoutes } from './routes/allRoutes';

export const app: express.Application = express();
//env variable for the port
const port = process.env.PORT;

// allRoutes file in routes folder
fetchAllRoutes(app);

app.listen(port,()=>{console.log("server is running");
});
