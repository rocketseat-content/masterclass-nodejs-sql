const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const Address = require('../models/addressModel');
const User = require('../models/userModel');
const Tech = require('../models/techModel');

const connection = new Sequelize(dbConfig);

const models = [Address, User, Tech];

const initializations = async () => {
    let modelsCounter = 0;
    return new Promise((resolve, reject) => {
        models.forEach(model => {
          
            if (modelsCounter === models.length) resolve();
            model.init(connection);
            modelsCounter += 1;
       
        });
    });
}


const associations = async () => {
    let modelsCounter = 0;
    return new Promise((resolve, reject)=> {
        models.forEach(model => {
         
            if(modelsCounter ===  models.length) resolve();
            model.associate(connection.models);
            modelsCounter+=1; 
         
        });
    } )
};

const database = async ()=> {
    await initializations(); 
    await associations();
}

database();

module.exports = connection; 
