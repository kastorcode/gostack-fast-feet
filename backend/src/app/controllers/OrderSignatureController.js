class OrderSignatureController {
	async store(req, res) {
		if (!req.file) {
			return res.status(500).json({
				error: 'Upload failed'
			});
		}

		const { order, file } = req;

		order.signature_id = file.filename;
		await order.save();

		return res.json({
			path: `${process.env.APP_URL}/signature/order/${file.filename}`
		});
	}
}


export default new OrderSignatureController();