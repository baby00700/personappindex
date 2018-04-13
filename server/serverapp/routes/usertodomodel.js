const Sequelize = require('sequelize');
const seq = require('./sql')

const todos = seq.define('todolist', {
     username: {
      type: Sequelize.STRING
     },
     todo: {
        type: Sequelize.TEXT
     },
     updatetime: {
        type: Sequelize.STRING
     },
    iscomplete: {
        type: Sequelize.INTEGER
    },
    isdelete: {
        type: Sequelize.INTEGER
    },
    jb: {
        type: Sequelize.INTEGER
    }
  },{
    'timestamps': false,  
    "createdAt":false,  
    "updatedAt":false,
    "deletedAt":false,
    freezeTableName: true
  })


  module.exports = todos