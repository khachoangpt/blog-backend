import path from 'node:path'
import type { ServiceLoaderParams } from '@/types'
import { Lifetime, asClass } from 'awilix'

export default async ({ container }: ServiceLoaderParams) => {
	container.loadModules(
		[
			[
				path.join(__dirname, '..', 'services/**/*.{ts,js}'),
				{
					register: asClass,
					lifetime: Lifetime.SINGLETON,
				},
			],
		],
		{
			formatName: 'camelCase',
			resolverOptions: {
				lifetime: Lifetime.SINGLETON,
				register: asClass,
			},
		},
	)
}
