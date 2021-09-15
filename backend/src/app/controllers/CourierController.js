import * as Yup from 'yup';
import Courier from '../models/Courier';


class CourierController {
	async index(req, res) {
		const { page = 1 } = req.query;

		const couriers = await Courier.findAll({
			attributes: ['id', 'name', 'avatar_id', 'email'],
			limit: 20,
			offset: (page - 1) * 20
		});

		return res.json(couriers);
	}


	async get(req, res) {
		const { id } = req.params;

		try {
			const courier = await Courier.findOne({
				where: { id }
			});

			return res.json(courier);
		}
		catch {
			return res.status(500).json();
		}
	}


	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			avatar_id: Yup.string().nullable(),
			email: Yup.string().email().required()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const courierExists = await Courier.findOne({
			where: {
				email: req.body.email
			}
		});

		if (courierExists) {
			return res.status(400).json({
				error: 'Courier already exists'
			});
		}

		const { id, name, avatar_id, email } = await Courier.create(req.body);

		return res.json({
			id, name, avatar_id, email
		});
	}


	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const courier = await Courier.findByPk(req.params.id);

		if (!courier) {
			return res.status(400).json({
				error: 'Courier does not exist'
			});
		}

		const { id, name, avatar_id, email } = await courier.update({
			name: req.body.name,
			email: req.body.email
		});

		return res.json({
			id, name, avatar_id, email
		});
	}


	async delete(req, res) {
		const { courier } = req;

		await courier.destroy();

		return res.json(courier);
	}
}


export default new CourierController();