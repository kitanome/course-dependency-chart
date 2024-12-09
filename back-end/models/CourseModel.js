import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Course = sequelize.define("Course", {
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prerequisites: {
    type: DataTypes.JSON, // empty array or JSON array
    allowNull: true,
  },
  corequisites: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instructors: {
    type: DataTypes.JSON, // null or long string with comma separated names
    allowNull: true,
  },
  comments: {
    type: DataTypes.JSON, // null or JSON array
    allowNull: true,
  },
});

export default Course;
