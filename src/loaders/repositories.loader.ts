import { asFunction, Lifetime } from 'awilix'
import path from 'path'

import { RepositoryLoaderParams } from '@/types'

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
