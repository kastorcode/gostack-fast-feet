import * as Yup from 'yup';
import Courier from '../models/Courier';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import OrderMail from '../jobs/OrderMail';
import Queue from '../../lib/Queue';


class OrderController {
	async index(req, res) {
		const { page = 1 } = req.query;

		const orders = await Order.findAll({
			limit: 20,
			offset: (page - 1) * 20
		});

		return res.json(orders);
	}


	async store(req, res) {
		const schema = Yup.object().shape({
			recipient_id: Yup.number().nullable().positive().integer(),
			courier_id: Yup.number().nullable().positive().integer(),
			signature_id: Yup.string().required(),
			product: Yup.string().required()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const order = await Order.create(req.body);
		const courier = await Courier.findOne({
			where: { id: order.courier_id },
			attributes: ['name', 'email']
		});
		const recipient = await Recipient.findOne({
			where: { id: order.recipient_id },
			attributes: ['name', 'street', 'number', 'city', 'state', 'zip_code', 'complement']
		});

		await Queue.add(OrderMail.key, { order, courier, recipient });

		return res.json(order);
	}


	async update(req, res) {
		const schema = Yup.object().shape({
			recipient_id: Yup.number().nullable().positive().integer(),
			courier_id: Yup.number().nullable().positive().integer(),
			signature_id: Yup.string(),
			product: Yup.string()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const order = await Order.findByPk(req.params.id);

		if (!order) {
			return res.status(400).json({
				error: 'Order does not exist'
			});
		}

		const orderUpdated = await order.update(req.body);

		return res.json(orderUpdated);
	}


	async delete(req, res) {
		const order = await Order.findByPk(req.params.id);

		if (!order) {
			return res.status(400).json({
				error: 'Order does not exist'
			});
		}

		await order.destroy();

		return res.json(order);
	}
}


export default new OrderController();