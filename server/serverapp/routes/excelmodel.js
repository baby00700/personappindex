const Sequelize = require('sequelize');
const seq = require('./sql')

const excelcon = seq.define('excel', {
     xh: {
      type: Sequelize.STRING
     },
     spbm: {
      type: Sequelize.STRING
     },
     spmc: {
        type: Sequelize.STRING
      },
      gsmc: {
        type: Sequelize.STRING
      },
      sjsj: {
        type: Sequelize.STRING
      },
      dw: {
        type: Sequelize.STRING
      },
      zt: {
        type: Sequelize.STRING
      },
      yjfl: {
        type: Sequelize.STRING
      },
      ejfl: {
        type: Sequelize.STRING
      },
      sjfl: {
        type: Sequelize.STRING
      },
      zqjg: {
        type: Sequelize.STRING
      }
  },{
    'timestamps': false,  
    "createdAt":false,  
    "updatedAt":false,  
    "deletedAt":false,
    freezeTableName: true
  })


  module.exports = excelcon