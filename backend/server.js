import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// import session from 'express-session';
// import { engine } from 'express-handlebars';

const appPort = process.env.PORT;
const app = express();
// Create a MySQL database connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const GITHUB_PAGES_ORIGIN = "https://spooky-pictures.github.io/calendar-app";

const corsOptions = {
  origin: GITHUB_PAGES_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.set('view engine', 'hbs');  // Set view engine to Handlebars
// app.set('views', path.join(__dirname, 'views'));  // Set views directory
app.set("trust proxy", 1);

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/calendar-app", express.static(path.join(__dirname, "../frontend")));

// Serve static files from the 'public' folder
// app.use('calendar-app/', express.static(path.join(__dirname, 'public')));
const GREETING = process.env.GREETING || "Hello from Express!";
app.get("/calendar-app/api/krneki", async (req, res) => {
  try {
    // const [result] = await db.execute('UPDATE jobs SET jobArchived = 1 WHERE idjobs = ?', [idjobs]);
    const user = await db.execute(
      "SELECT name FROM scheduler.employees WHERE id = 1"
    );
    res.status(200).json({ message: `New user ${user} selected` });
  } catch (err) {
    console.error("Error changing the role:", err);
    res.status(500).json({ error: "Could not change the role" });
  }
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(appPort, () => {
  console.log(`Server is running on https://spooky.si:${appPort}`);
});

export default db;
