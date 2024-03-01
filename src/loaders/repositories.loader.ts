import path from 'path'
import type { RepositoryLoaderParams } from '@/types'
import { Lifetime, asFunction } from 'awilix'

export default async ({ container }: RepositoryLoaderParams) => {
	container.loadModules(
		[
			[
				path.join(__dirname, '..', 'repositories/*.{ts,js}'),
				{
					lifetime: Lifetime.SINGLETON,
					register: asFunction,
				},
			],
		],
		{
			formatName: 'camelCase',
			resolverOptions: {
				lifetime: Lifetime.SINGLETON,
				register: asFunction,
			},
		},
	)
}
