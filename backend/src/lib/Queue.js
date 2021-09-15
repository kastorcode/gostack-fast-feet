import BeeQueue from 'bee-queue';
import redisConfig from '../config/redis';
import CanceledOrderMail from '../app/jobs/CanceledOrderMail';
import OrderMail from '../app/jobs/OrderMail';


const jobs = [CanceledOrderMail, OrderMail];


class Queue {
	constructor() {
		this.queues = {};

		this.init();
	}


	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				bee: new BeeQueue(key, {
					redis: redisConfig
				}),
				handle
			};
		});
	}


	add(queue, job) {
		return this.queues[queue].bee.createJob(job).save();
	}


	processQueue() {
		jobs.forEach(job => {
			const { bee, handle } = this.queues[job.key];
			bee.on('failed', this.handleFailure).process(handle);
		});
	}


	handleFailure(job, err) {
		console.log(`Queue ${job.queue.name}: FAILED`, err);
	}
}


export default new Queue();