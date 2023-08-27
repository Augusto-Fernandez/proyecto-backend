import cron from 'node-cron';
import container from '../../container.js';
import dateFormat from '../../utils/dateFormat.js';
import MailService from '../../shared/MailService.js';

const cronHandler = async (req, res, next) => {
    const userRepository = container.resolve('UserRepository');

    const users = await userRepository.getAll();
    const lastConnections = users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        last_connection: dateFormat(user.last_connection)
    }));

    cron.schedule('0 */48 * * *', async () => {
        const cutoffTime = new Date();
        cutoffTime.setHours(cutoffTime.getHours() - 48);

        const usersToDelete = lastConnections.filter(user => user.last_connection < cutoffTime);

        for (const user of usersToDelete) {
            await userRepository.deleteOne(user.id)
            const message = new MailService;
            await message.send('deletedUser.hbs',{userName:user.firstName},user.email,'Deleted Account');
        }
    });

    next();
}

export default cronHandler;