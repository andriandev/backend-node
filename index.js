import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import UsersRoute from './app/routes/UsersRoute.js';
import AuthRoute from './app/routes/AuthRoute.js';
import PagesRoute from './app/routes/PagesRoute.js';
// import DB from './app/config/database.js';
// import UserModel from './app/models/UsersModel.js';

// Check database connection
// DB.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch((e) => console.log(e.message));

// Sync and create table user in database (sequelize fiture)
// UserModel.sync({ force: true })
//   .then(console.log('Table created succesfully'))
//   .catch((e) => console.log(e?.message));

// Config
dotenv.config();
const app = express();
const port = process.env.APP_PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Route
app.use(UsersRoute);
app.use(AuthRoute);
app.use(PagesRoute);

// App running
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
