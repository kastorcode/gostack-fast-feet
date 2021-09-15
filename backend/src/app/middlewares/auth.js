import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';


export default async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({
			error: 'Token not provided'
		});
	}

	try {
		req.user = await promisify(jwt.verify)(authorization, authConfig.secret);
		return next();
	}
	catch {
		return res.status(401).json({
			error: 'Token invalid'
		});
	}
};