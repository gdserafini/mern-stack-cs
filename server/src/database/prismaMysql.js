import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

export const prisma = new PrismaClient();

const makeAdmin = async function(){
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        await bcrypt.genSalt()
    );

    await prisma.user.create({
            data: {
                name: 'Server administrator.',
                username: username,
                email: 'admin@admin.com',
                password: password,
                avatar: 'no-avatar',
                background: 'no-background',
                type: 'ADMIN'
            }
    });
};

export const BootstrapDB = async function(){
    console.log('Checking initial data...');
    await makeAdmin();
    console.log('Done');
};