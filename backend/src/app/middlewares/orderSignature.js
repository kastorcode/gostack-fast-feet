import Order from '../models/Order';


export default async function(req, res, next) {
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

	req.order = order;
	return next();
}