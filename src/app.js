import dotenv from "dotenv";
dotenv.config();

import DbFactory from "./data/factories/dbFactory.js";
import AppFactory from "./presentation/factories/appFactory.js";

const db = DbFactory.create(process.env.DB);
db.init(process.env.DB_URI);

const app = AppFactory.create(process.env.APPLICATION);

app.init();
app.build();
app.listen();
