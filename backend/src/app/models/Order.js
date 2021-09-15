import Sequelize, { Model } from 'sequelize';


class Order extends Model {
	static init(sequelize) {
		super.init({
			recipient_id: Sequelize.INTEGER,
			courier_id: Sequelize.INTEGER,
			signature_id: Sequelize.STRING,
			product: Sequelize.STRING,
			canceled_at: Sequelize.DATE,
			start_date: Sequelize.DATE,
			end_date: Sequelize.DATE
		},
		{
			sequelize
		});


		return this;
	}


	static associate(models) {
		this.belongsTo(models.DeliveryProblems, {
			foreignKey: 'id',
			as: 'delivery_problems'
		});

		this.belongsTo(models.Courier, {
			foreignKey: 'id',
			as: 'courier'
		});
	}
}


export default Order;