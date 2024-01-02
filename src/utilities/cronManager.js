import cron from 'node-cron';
import { Todo } from '../models/todo.model.js';
import moment from 'moment-timezone';

class CronManager {
  constructor() {
    if (!CronManager.instance) {
      this.initializeCronJob();
      CronManager.instance = this;
    }

    return CronManager.instance;
  }

  initializeCronJob() {
    cron.schedule('00 08 * * *', async () => {
      try {
        const currentDateIST = new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata', // IST time zone
        });

        // Update completed status for expired todos
        await Todo.updateMany(
          {
            dueDate: { $lt: currentDateIST },
            completed: false,
          },
          {
            $set: { completed: true },
          }
        );

        console.log(`CRON job executed successfully at ${moment().tz('Asia/kolkata').format('YYYY-MM-DD hh:mm:ss A')}`);
      } catch (error) {
        console.error('Error executing CRON job:', error);
      }
    });
  }
}

export default CronManager;
