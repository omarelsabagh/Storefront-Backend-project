import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

//destructing env variables
const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

//creating connection
const Client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default Client;
