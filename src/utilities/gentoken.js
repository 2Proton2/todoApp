import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';

const genToken = (res, userId) => {
    try {
        const expirationTime = moment().add(1, 'days');

        const token = jwt.sign({ userId }, process.env.PRIVATE_KEY, { expiresIn: expirationTime.valueOf() })
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //Expires in 1 Day
            sameSite: 'strict'
        });
        return null;
    } catch (error) {
        console.log(error);
    }
}

export default genToken;