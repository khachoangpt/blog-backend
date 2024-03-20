import { NodeEnvEnum } from '@/constants'
import { PrismaClient } from '@prisma/client'
import { appConfig } from './app-config'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (appConfig.env !== NodeEnvEnum.production) globalThis.prismaGlobal = prisma

export default prisma
