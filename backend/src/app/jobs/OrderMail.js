import Mail from '../../lib/Mail';


class OrderMail {
	get key() {
		return 'OrderMail';
	}


	async handle({ data }) {
		const { order, courier, recipient } = data;

		await Mail.sendMail({
			to: `${courier.name} <${courier.email}>`,
			subject: 'Nova entrega',
			template: 'new-delivery',
			context: {
				courier: courier.name,
				product: order.product,
				name: recipient.name,
				street: recipient.street,
				number: recipient.number,
				city: recipient.city,
				state: recipient.state,
				zip_code: recipient.zip_code,
				complement: recipient.complement
			}
		});
	}
}


export default new OrderMail();