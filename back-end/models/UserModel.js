import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  savedCourses: {
    type: DataTypes.JSON, // null or JSON array
    allowNull: true
  }
});

export default User;
