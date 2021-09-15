import * as Yup from 'yup';
import Recipient from '../models/Recipient';


class RecipientController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email(),
			street: Yup.string().required(),
			number: Yup.number().integer(),
			complement: Yup.string(),
			state: Yup.string().required(),
			city: Yup.string().required(),
			zip_code: Yup.number().integer().required()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const recipient = await Recipient.create(req.body);

		return res.json(recipient);
	}


	async update(req, res) {
		const schema = Yup.object().shape({
			id: Yup.number().integer().required(),
			name: Yup.string(),
			email: Yup.string().email(),
			street: Yup.string(),
			number: Yup.number().integer(),
			complement: Yup.string(),
			state: Yup.string(),
			city: Yup.string(),
			zip_code: Yup.number().integer()
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const recipient = await Recipient.findByPk(req.body.id);

		if (!recipient) {
			return res.status(400).json({
				error: "Recipient doesn't exist"
			});
		}

		const updatedRecipient = await recipient.update(req.body);

		return res.json(updatedRecipient);
	}
}


export default new RecipientController();