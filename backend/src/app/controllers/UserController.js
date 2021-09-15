import * as Yup from 'yup';
import passwordConfig from '../../config/password';
import User from '../models/User';


class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(passwordConfig.minLength)
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const userExists = await User.findOne({
			where: {
				email: req.body.email
			}
		});

		if (userExists) {
			return res.status(400).json({
				error: 'User already exists'
			});
		}

		const { id, name, email, admin } = await User.create(req.body);

		return res.json({
			id,
			name,
			email,
			admin
		});
	}


	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(passwordConfig.minLength),
			password: Yup.string().min(passwordConfig.minLength).when('oldPassword', (oldPassword, field) => {
				return oldPassword ? field.required() : field;
			}),
			confirmPassword: Yup.string().when('password', (password, field) => {
				return password ? field.required().oneOf([Yup.ref('password')]) : field;
			})
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				error: 'Validation fails'
			});
		}

		const { email, oldPassword } = req.body;
		const user = await User.findByPk(req.user.id);

		if (email != user.email) {
			const userExists = await User.findOne({
				where: {
					email
				}
			});

			if (userExists) {
				return res.status(400).json({
					error: 'User already exists'
				});
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({
				error: "Password doesn't match"
			});
		}

		const { id, name, admin } = await user.update(req.body);

		return res.json({
			id,
			name,
			email,
			admin
		});
	}
}


export default new UserController();