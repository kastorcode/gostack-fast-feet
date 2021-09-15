import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';


class CanceledOrderMail {
	get key() {
		return 'CanceledOrderMail';
	}


	async handle({ data }) {
		const { order } = data;
		const { delivery_problems, courier } = order;

		await Mail.sendMail({
			to: `${courier.name} <${courier.email}>`,
			subject: 'Entrega cancelada',
			template: 'canceled-delivery',
			context: {
				courier: courier.name,
				product: order.product,
				canceled_at: format(
					parseISO(order.canceled_at),
					"'dia' dd 'de' MMMM', às' H:mm'h'",
					{ locale: pt }
				),
				problems: delivery_problems.description
			}
		});
	}
}


export default new CanceledOrderMail();