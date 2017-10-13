'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      username: 'admin',
      password: '9079dbe1a6d61c66bc2bd12552eacf2fd82f4d7facab8b8fc8be178b2adc1414',
      role:'manager',
      createdAt: new Date(),
      updatedAt: new Date(),
      salt: 'bMqOztQx'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
