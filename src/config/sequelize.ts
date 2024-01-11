import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.js';
import { UserDetail } from '../models/UserDetail.js';
import { UserRole } from '../models/UserRole.js';
import dotenv from 'dotenv';
import { MailTempalte } from "../models/MailTempaltes.js";
import { UserOtp } from "../models/UserOtp.js";
import { Genre } from '../models/Genre.js';

dotenv.config();
const connection = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  dialect: 'postgres',
  models: [User, UserRole, UserDetail, MailTempalte, UserOtp, Genre],
  logging: false,
});

export default connection;