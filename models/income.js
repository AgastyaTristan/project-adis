'use strict';
const {
  Model
} = require('sequelize');

const {User} = require("../models")

module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Income.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Income"
      })
    }

    static addIncome = async({id}, {income}) => {
      await this.create({
        userId: id,
        income: income
      })
    }

    static delIncome = async({id}, {incomeId}) => {
      console.log(id)
      console.log(incomeId)

      const isUserExist = await User.findOne({include:["Income", "Outcome"]}, {where: {id: id}})
      const isIncomeExist = await this.findOne({where: {userId: id, id: incomeId}})
      
      console.log(isUserExist)
      console.log(isIncomeExist)

      if (!isUserExist) return Promise.reject("User not found")
      if (!isIncomeExist) return Promise.reject("Id not found")

      User.update({
        balance: isUserExist.balance+isIncomeExist.income
      }, {where: {id: id}})
      return this.destroy({where: {userId: id, id: incomeId}})
    }
  }
  Income.init({
    userId: DataTypes.INTEGER,
    income: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};