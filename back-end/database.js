import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// const SequelStore = SequelizeStore(session.Store);
// const db = new Sequelize({
// 	database:'session',
// 	dialect:'sqlite',
// 	storage:'session.sqlite',
// });

// export const sessionStore = new SequelStore({
// 	db: db,
// 	checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
// 	expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
// })
