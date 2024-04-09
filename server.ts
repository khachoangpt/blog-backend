import app from '@/app'
import { appConfig } from '@/configs/app-config'
import { logger } from '@/configs/logger'
import { NodeEnvEnum } from '@/constants'
import loaders from '@/loaders'
import { generateAdminOas, generateCustomerOas } from '@/utils/generate-oas'

const bootstrap = async () => {
	await loaders(app)

	if (appConfig.env === NodeEnvEnum.development) {
		await generateAdminOas()
		await generateCustomerOas()
	}

	app.listen(appConfig.port, () => {
		logger.info(`Server listening on port ${appConfig.port}`)
	})
}

bootstrap()
