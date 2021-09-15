import User from '../models/User';


export default async (req, res, next) => {
	const isAdmin = await User.findOne({
		where: {
			id: req.user.id,
			admin: true
		}
	});

	if (isAdmin) {
		return next();
	}
	else {
		return res.status(401).json({
			error: 'The user is not an administrator'
		});
	}
}