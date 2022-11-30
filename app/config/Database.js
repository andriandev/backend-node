import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      typeCast: function (field, next) {
        // For reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    timezone: '+07:00', // For write to database convert timezone UTC+7
  }
);

export default DB;
