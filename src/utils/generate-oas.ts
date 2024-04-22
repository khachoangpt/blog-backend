import fs from 'node:fs'
import { logger } from '@/configs/logger'
import swaggerJSDoc from 'swagger-jsdoc'
import { validateOAS } from './validate-oas'

const adminOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Shop Admin',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:8000/v1/api',
				description: 'Development server',
			},
		],
	},
	apis: ['./src/controllers/admin/**/*.ts', './src/models/**/*.ts', './src/constants/enum.ts'],
}

const customerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Shop Customer',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:8000/v1/api',
				description: 'Development server',
			},
		],
	},
	apis: ['./src/controllers/customer/**/*.ts', './src/models/**/*.ts', './src/constants/enum.ts'],
}

/**
 * Generates the OpenAPI Specification (OAS) for the admin API.
 *
 * @return {Promise<void>} - A promise that resolves when the OAS has been generated and exported.
 */
export const generateAdminOas = async (): Promise<void> => {
	logger.info('🟣 Generating Admin OAS')
	const openapiSpecification = swaggerJSDoc(adminOptions)
	await validateOAS(openapiSpecification, 'Admin')
	fs.writeFileSync('./docs/spec.admin.json', JSON.stringify(openapiSpecification, null, 2))
	convertOasForNextJs(openapiSpecification, 'admin')
	logger.info('⚫️ Exported Admin OAS')
}

/**
 * Generates the OpenAPI Specification (OAS) for the customer API.
 *
 * @return {Promise<void>} - A promise that resolves when the OAS has been generated and exported.
 */
export const generateCustomerOas = async (): Promise<void> => {
	logger.info('🟣 Generating Customer OAS')
	const openapiSpecification = swaggerJSDoc(customerOptions)
	await validateOAS(openapiSpecification, 'Customer')
	fs.writeFileSync('./docs/spec.customer.json', JSON.stringify(openapiSpecification, null, 2))
	convertOasForNextJs(openapiSpecification, 'customer')
	logger.info('⚫️ Exported Customer OAS')
}

/**
 * Converts the given OpenAPI specification for Next.js usage and writes the result to a JSON file.
 *
 * @param {any} oas - the OpenAPI specification to convert
 * @param {'customer' | 'admin'} type - the type of the Next.js option
 * @return {void}
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const convertOasForNextJs = (oas: any, type: 'customer' | 'admin'): void => {
	const paths = oas.paths
	const pathsArray = Object.entries(paths).map(([path, method]) => ({ path, method }))

	for (let i = 0; i < pathsArray.length; i++) {
		const method = pathsArray[i].method as unknown as { parameters: Array<object> }
		method.parameters = [
			{
				in: 'path',
				name: 'cache',
				description: 'Next.js option',
				schema: {
					$ref: '#/components/schemas/NextJsOptions',
				},
				required: false,
			},
		]
	}

	const pathsObj = Object.fromEntries(pathsArray.map((i) => [i.path, i.method]))
	oas.paths = Object.assign(oas.paths, pathsObj)

	fs.writeFileSync(`./docs/next-spec.${type}.json`, JSON.stringify(oas, null, 2))
}
