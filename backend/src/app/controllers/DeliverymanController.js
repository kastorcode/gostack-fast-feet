import { isBefore, isAfter, isSameDay } from 'date-fns';
import fs from 'fs';
import { resolve } from 'path';
import { Op } from 'sequelize';
import Deliveries from '../models/Deliveries';
import Order from '../models/Order';


class DeliverymanController {
	async index(req, res) {
		const { id: courier_id } = req.user;

		const orders = await Order.findAll({
			where: {
				courier_id,
				canceled_at: null,
				end_date: null
			}
		});

		return res.json(orders);
	}


	async deliveries(req, res) {
		const { id: courier_id } = req.user;

		const orders = await Order.findAll({
			where: {
				courier_id,
				end_date: { [Op.ne]: null }
			}
		});

		return res.json(orders);
	}


	async store(req, res) {
		const now = new Date();

		if (isBefore(now, new Date().setHours(8, 0, 0)) ||
				isAfter(now, new Date().setHours(18, 0, 0))) {
			return res.status(401).json({
				error: 'Deliveries must be picked up from 8am to 6pm'
			});
		}

		const order = await Order.findByPk(req.params.id);

		if (!order) {
			return res.status(400).json({
				error: 'Order does not exist'
			});
		}

		if (order.courier_id != req.user.id) {
			return res.status(401).json({
				error: 'Order does not belong you'
			});
		}

		const [deliveries] = await Deliveries.findOrCreate({
		  where: { id: req.user.id },
		  attributes: ['total', 'updated_at'],
		  defaults: {
		  	id: req.user.id,
		  	total: 0,
		  	updated_at: now
		  }
		});

		if (deliveries.total > 4 && isSameDay(deliveries.updated_at, now)) {
			return res.status(401).json({
				error: 'You have reached the limit of daily deliveries'
			});
		}

		order.start_date = now;
		await order.save();

		return res.json(order);
	}


	async update(req, res) {
		const order = await Order.findByPk(req.params.id);

		if (!order) {
			return res.status(400).json({
				error: 'Order does not exist'
			});
		}

		if (order.courier_id != req.user.id) {
			return res.status(401).json({
				error: 'Order does not belong you'
			});
		}

		if (order.end_date) {
			return res.status(400).json({
				error: 'Order already delivered'
			});
		}

		if (!fs.existsSync(resolve(__dirname, '..', '..', '..', 'signature', 'order', order.signature_id))) {
			return res.status(400).json({
				error: 'Signature not sent'
			});
		}

		const now = new Date();
		const deliveries = await Deliveries.findByPk(req.user.id);
		deliveries.updated_at = now;
		deliveries.total = deliveries.total == 5 ? 1 : deliveries.total += 1;
		await deliveries.save();

		order.end_date = now;
		await order.save();

		return res.json(order);
	}
}


export default new DeliverymanController();