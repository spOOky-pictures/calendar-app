import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

// import session from 'express-session';
// import bodyParser from "body-parser";
// import path from "path";
// import { engine } from 'express-handlebars';

const appPort = process.env.PORT;
const app = express();
// Create a MySQL database connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const GITHUB_PAGES_ORIGIN = 'https://spooky-pictures.github.io/calendar-app';

const corsOptions = {
    origin: GITHUB_PAGES_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(appPort, () => {
    console.log(`Server is running on https://spooky.si:${appPort}`);
});

export default db;