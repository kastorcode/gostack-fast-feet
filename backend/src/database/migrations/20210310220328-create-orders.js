'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'recipients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      courier_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'couriers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      signature_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  }
};
