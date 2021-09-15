import * as Yup from 'yup';
import Courier from '../models/Courier';
import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import CanceledOrderMail from '../jobs/CanceledOrderMail';
import Queue from '../../lib/Queue';


class DeliveryProblemsController {
	async index(req, res) {
		const { page = 1 } = req.query;

		const deliveries = await DeliveryProblems.findAll({
			limit: 20,
			offset: (page - 1) * 20,
			attributes: ['id', 'description'],
			include: [{
				model: Order,
				as: 'order',
				attributes: ['product']
			}]
		});

		return res.json(deliveries);
	}


	async get(req, res) {
		const { id } = req.params;

		const delivery = await DeliveryProblems.findOne({
			where: { id },
			attributes: ['description', 'createdAt', 'updatedAt'],
			include: [{
				model: Order,
				as: 'order',
				attributes: ['recipient_id', 'courier_id', 'signature_id', 'product', 'canceled_at', 'start_date', 'end_date', 'createdAt', 'updatedAt']
			}]
		});

		if (!delivery) {
			return res.status(400).json({
				error: 'Delivery does not exist'
			});
		}

		return res.json(delivery);
	}


	async store(req, res) {
		const schema = Yup.object().shape({
			description: Yup.string().required()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const { id } = req.params;
		const { id: courier_id } = req.user;

		const delivery = await DeliveryProblems.findOne({
			where: { id },
			include: [{
				model: Order,
				as: 'order',
				where: { courier_id }
			}]
		});

		if (!delivery) {
			return res.status(400).json({
				error: 'Delivery does not exist'
			});
		}

		await delivery.update(req.body);

		return res.json(delivery);
	}


	async update(req, res) {
		const { id } = req.params;

		const order = await Order.findOne({
			where: { id },
			include: [
				{
					model: DeliveryProblems,
					as: 'delivery_problems',
					attributes: ['description']
				},
				{
					model: Courier,
					as: 'courier',
					attributes: ['name', 'email']
				}
			]
		});

		if (!order) {
			return res.status(400).json({
				error: 'Order does not exist'
			});
		}

		if (order.canceled_at) {
			return res.status(400).json({
				error: 'Order already canceled'
			});
		}

		await order.update({
			canceled_at: new Date()
		});

		await Queue.add(CanceledOrderMail.key, { order });

		return res.json(order);
	}
}


export default new DeliveryProblemsController();