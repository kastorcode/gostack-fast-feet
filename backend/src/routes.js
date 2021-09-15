import { Router } from 'express';
import adminMiddleware from './app/middlewares/admin';
import authMiddleware from './app/middlewares/auth';
import courierAvatarMiddleware from './app/middlewares/courierAvatar';
import CourierAvatarController from './app/controllers/CourierAvatarController';
import CourierController from './app/controllers/CourierController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import OrderController from './app/controllers/OrderController';
import OrderSignatureController from './app/controllers/OrderSignatureController';
import orderSignatureMiddleware from './app/middlewares/orderSignature';
import orderSignatureUploadMiddleware from './app/middlewares/orderSignatureUpload';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';


const routes = new Router();


routes.post('/sessions', SessionController.store);

routes.post('/users', authMiddleware, UserController.store);

routes.put('/users', authMiddleware, UserController.update);

routes.post('/recipients', authMiddleware, RecipientController.store);

routes.put('/recipients', authMiddleware, RecipientController.update);

routes.post('/uploads/courier/avatar', authMiddleware, adminMiddleware, courierAvatarMiddleware.single('file'), CourierAvatarController.store);

routes.get('/couriers', authMiddleware, adminMiddleware, CourierController.index);

routes.get('/couriers/:id', authMiddleware, adminMiddleware, CourierController.get);

routes.post('/couriers', authMiddleware, adminMiddleware, CourierController.store);

routes.put('/couriers/:id', authMiddleware, adminMiddleware, CourierController.update);

routes.delete('/couriers/:id', authMiddleware, adminMiddleware, CourierAvatarController.delete, CourierController.delete);

routes.get('/orders', authMiddleware, adminMiddleware, OrderController.index);

routes.post('/orders', authMiddleware, adminMiddleware, OrderController.store);

routes.put('/orders/:id', authMiddleware, adminMiddleware, OrderController.update);

routes.delete('/orders/:id', authMiddleware, adminMiddleware, OrderController.delete);

routes.get('/deliveryman', authMiddleware, DeliverymanController.index);

routes.get('/deliveryman/deliveries', authMiddleware, DeliverymanController.deliveries);

routes.post('/deliveryman/start/:id', authMiddleware, DeliverymanController.store);

routes.put('/deliveryman/end/:id', authMiddleware, DeliverymanController.update);

routes.post('/uploads/signature/order/:id', authMiddleware, orderSignatureMiddleware, orderSignatureUploadMiddleware.single('file'), OrderSignatureController.store);

routes.get('/deliveries/problems', authMiddleware, adminMiddleware, DeliveryProblemsController.index);

routes.get('/delivery/:id/problems', authMiddleware, adminMiddleware, DeliveryProblemsController.get);

routes.post('/delivery/:id/problems', authMiddleware, DeliveryProblemsController.store);

routes.put('/delivery/:id/cancel', authMiddleware, adminMiddleware, DeliveryProblemsController.update);

routes.get('*', (req, res) => {
	return res.status(404).send('<h1>Not Found</h1>');
});


export default routes;