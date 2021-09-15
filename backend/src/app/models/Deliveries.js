import Sequelize, { Model } from 'sequelize';


class Deliveries extends Model {
	static init(sequelize) {
		super.init({
			total: Sequelize.INTEGER,
			updated_at: Sequelize.DATE
		},
		{
			sequelize
		});


		return this;
	}
}


export default Deliveries;