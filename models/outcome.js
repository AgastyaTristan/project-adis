'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Outcome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Income.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Outcome"
      })
    }

    static addOutcome = async({id}, {outcome}) => {
      await this.create({
        userId: id,
        outcome: outcome
      })
    }

    static delOutcome = async({id}, {outcomeId}) => {
      const isUserExist = await User.findOne({include:["Income", "Outcome"]}, {where: {id: id}})
      const isOutcomeExist = await this.findOne({where: {userId: id, id: outcomeId}})
      
      console.log(isUserExist)
      console.log(isOutcomeExist)

      if (!isUserExist) return Promise.reject("User not found")
      if (!isOutcomeExist) return Promise.reject("Id not found")

      User.update({
        balance: isUserExist.balance-isOutcomeExist.income
      }, {where: {id: id}})
      return this.destroy({where: {userId: id, id: outcomeIdId}})
    }
  }
  Outcome.init({
    userId: DataTypes.INTEGER,
    outcome: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Outcome',
  });
  return Outcome;
};