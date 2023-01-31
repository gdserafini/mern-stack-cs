import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {find} from '../services/user.service.js';
import logger from '../lib/log.js';

export const prisma = new PrismaClient();

const makeAdmin = async function(){
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        await bcrypt.genSalt()
    );

    const admin = await prisma.user.findUnique({
        where: {
            username: 'admin'
        }
    });

    if(admin) return ;

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
    logger.info('Checking initial data...');
    await makeAdmin();
    logger.info('Done.');
};