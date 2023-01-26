import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = async function(field, value){
    if(!field || !value){
        return {
            statusCode: 400,
            message: 'Missing data.'
        }
    }

    return prisma.user.findUnique({
        where: {
            [field]: value
        }
    });
};