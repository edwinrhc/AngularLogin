import { Sequelize } from "sequelize";


const db = new Sequelize('rrhh', 'edwin', '123456' ,{

    host: 'localhost',
    dialect: 'mysql'
});

export default db;