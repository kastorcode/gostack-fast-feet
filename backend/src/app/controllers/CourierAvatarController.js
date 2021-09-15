import fs from 'fs';
import { resolve } from 'path';
import Courier from '../models/Courier';


class CourierAvatarController {
	async store(req, res) {
		if (req.file) {
			const {
				filename: avatar_id,
				mimetype
			} = req.file;

			const previous_avatar = resolve(__dirname, '..', '..', '..', 'avatar', 'courier', req.user.id + (mimetype == 'image/jpeg' ? '.png' : '.jpg'));

			if (fs.existsSync(previous_avatar)) {
				fs.unlinkSync(previous_avatar);
			}

			const courier = await Courier.findByPk(req.user.id);

			if (courier) {
				await courier.update({ avatar_id });
			}

			return res.json({
				avatar_id,
				path: `${process.env.APP_URL}/avatar/courier/${avatar_id}`
			});
		}
		else {
			return res.status(500).json({
				error: 'Upload failed'
			});
		}
	}


	async delete(req, res, next) {
		const courier = await Courier.findByPk(req.params.id);

		if (!courier) {
			return res.status(400).json({
				error: 'Courier does not exist'
			});
		}

		const avatar_id = resolve(__dirname, '..', '..', '..', 'avatar', 'courier', courier.avatar_id);

		if (fs.existsSync(avatar_id)) {
			fs.unlinkSync(avatar_id);
		}

		req.courier = courier;

		return next();
	}
}


export default new CourierAvatarController();