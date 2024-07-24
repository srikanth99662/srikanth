{
  "name": "hari-backend",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.19.2",
    "nodemon": "^3.1.4",
    "pg": "^8.12.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.3"
  }
}


import express from 'express';
import { connection } from './krishna.js';

const app = express();
const port = 3000;

app.use(express.json());


connection().then(() => {
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
});


import { Sequelize } from "sequelize";
import { userModel } from "./model/login.js";

export const connection = async () => {
    // Option 3: Passing parameters separately (other dialects)
    const sequelize = new Sequelize('ecommerce', 'postgres', 'password', {
        host: 'localhost',
        dialect: 'postgres'
    });

    let User = null;
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        if (typeof userModel === 'function') {
            User = userModel(sequelize);
        } else {
            throw new Error('userModel is not a function');
        }

        // Synchronize the models
        await sequelize.sync();
        console.log('Table created successfully');
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


import { DataTypes } from "sequelize";

export const userModel = (sequelize) => {
    return sequelize.define("User", {
        username: {
            type: DataTypes.TEXT,
            allowNull: false, 
            field: 'username'
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false, 
            field: 'name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            field: 'email'
        },
    }, {
        tableName: 'users'
    });
};
