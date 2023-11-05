import { Sequelize } from 'sequelize-typescript';
import { User } from './../models/User.js';

const connection = new Sequelize({
  database: 'portal_games',
  username: 'postgres',
  password: 'admin',
  dialect: 'postgres',
  models: [User],
  logging: false,
});

export default connection;