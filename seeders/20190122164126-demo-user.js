'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {firstName: 'Michael', lastName: 'Kelso', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Eric', lastName: 'Forman', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Jackie', lastName: 'Burkhart', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Steven', lastName: 'Hyde', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Red', lastName: 'Forman', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Kitty', lastName: 'Forman', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Fez', lastName: 'The Foreigner', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Donna', lastName: 'Pinciotti', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Jamie', lastName: 'Jameson', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Captain Richard', lastName: 'E. Winters', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'William', lastName: 'Guarnere', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Leo', lastName: 'Hey Man', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Carl', lastName: 'Johnson', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Ashish', lastName: 'Kumar', createdAt: new Date(), updatedAt: new Date()},
            {firstName: 'Angad', lastName: 'Chotalla', createdAt: new Date(), updatedAt: new Date()}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
