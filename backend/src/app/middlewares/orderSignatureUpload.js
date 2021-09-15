import multer from 'multer';
import { resolve } from 'path';


const upload = multer({
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', '..', 'signature', 'order'),
		filename: (req, file, cb) => {
			return cb(null, req.order.id + (file.mimetype == 'image/jpeg' ? '.jpg' : '.png'));
		}
	}),
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
			cb(null, true);
		}
		else {
			cb(null, false);
		}
	}
});


export default upload;