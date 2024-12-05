import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Course = sequelize.define('Course', {
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prerequisites: {
    type: DataTypes.JSON, // Using JSON to store arrays
    allowNull: true
  },
  corequisites: {
    type: DataTypes.JSON, // Using JSON to store arrays
    allowNull: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  professors: {
    type: DataTypes.JSON, // Using JSON to store arrays
    allowNull: true
  }
});

export default Course;
