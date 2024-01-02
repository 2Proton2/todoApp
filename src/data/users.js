import bcrypt from 'bcryptjs';

const users = [
    {
        email: 'todo.user.1@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        email: 'todo.user.2@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        email: 'todo.user.3@email.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;