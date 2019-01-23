const Sequelize = require('sequelize');

let User = {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
};

module.exports = User;
