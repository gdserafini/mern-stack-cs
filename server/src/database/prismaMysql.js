import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

export const prisma = new PrismaClient();

const makeRole = async function(roleName) {
    const exists = await prisma.role.findUnique({
        where: {name: roleName}
    });

    if(!exists){
        await prisma.role.create({
            data: {name: roleName}
        });
    };
};

const makeAdmin = async function(){
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const password = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        await bcrypt.genSalt()
    );

    const exists = await prisma.user.findFirst({
        where: {
            roles: {
                some: {
                    name: 'ADMIN'
                }
            }
        }
    });

    if(!exists){
        await prisma.user.create({
            data: {
                name: 'Server administrator.',
                username: username,
                email: 'admin@admin.com',
                password: password,
                avatar: 'no-avatar',
                background: 'no-background',
                roles: {
                    connect: [
                        {
                            name: 'ADMIN'
                        }
                    ]
                }
            }
        })
    }
};

export const BootstrapDB = async function(){
    console.log('Checking initial data...');
    await makeRole('ADMIN');
    await makeRole('USER');
    await makeAdmin();
    console.log('Done');
};