import {PrismaClient} from '@prisma/client';
import logger from '../lib/log.js';
import { BadRequest, ServerError } from '../lib/error.js';
import { prisma } from '../database/prismaMysql.js';

//const prisma = new PrismaClient();

export const getUser = async function(field, value){
    logger.debug({authToGetService: {field, value}});

    ServerError
        .throwIf(!field, 'Missing field.', BadRequest)
        .throwIf(!value, 'Missing value.', BadRequest);

    return prisma.user.findUnique({
        where: {
            [field]: value
        }
    });
};