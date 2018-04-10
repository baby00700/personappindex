const Sequelize = require('sequelize');
const seq = require('./sql')

const userinfo = seq.define('userinfo', {
     username: {
      type: Sequelize.STRING
     },
     userpsd: {
        type: Sequelize.STRING
      },
      useremail: {
        type: Sequelize.STRING
      },
      regtime: {
        type: Sequelize.STRING
      }
  },{
    'timestamps': false,  
    "createdAt":false,  
    "updatedAt":false,  
    "deletedAt":false,
    freezeTableName: true
  })


  module.exports = userinfo