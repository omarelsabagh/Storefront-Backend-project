import express from 'express';

import { fetchAllRoutes } from './routes/allRoutes';

const app: express.Application = express();
const port = 3000;

fetchAllRoutes(app);

app.listen(port, () => {
    console.log(`local server is working on port: ${port}`);
});
