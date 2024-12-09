import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

sequelize.define("Session", {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
  });