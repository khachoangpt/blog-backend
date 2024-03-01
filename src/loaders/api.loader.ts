import routes from '@/routes'
import type { Express } from 'express'

type ApiLoaderParams = {
	app: Express
}

export default async ({ app }: ApiLoaderParams) => {
	app.use(routes(app))
}
