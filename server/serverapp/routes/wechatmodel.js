const Sequelize = require('sequelize');
const seq = require('./sql')

const wechat = seq.define('wechat', {
    accesstoken: {
      type: Sequelize.STRING
     }
  },{
    'timestamps': false,  
    "createdAt":false,  
    "updatedAt":false,
    "deletedAt":false,
    freezeTableName: true
  })


  module.exports = wechat