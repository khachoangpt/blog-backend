import path from 'path'
import { DataSource } from 'typeorm'
import { appConfig } from './app-config'

const dataSource: DataSource = new DataSource({
	type: 'postgres',
	url: appConfig.db.DATABASE_URL,
	schema: 'public',
	entities: [path.join(__dirname, '..', 'models/**/*.model.{js,ts}')],
	migrations: ['dist/src/migrations/*.{ts,js}'],
	migrationsTableName: 'migrations',
	synchronize: true,
})

export default dataSource
