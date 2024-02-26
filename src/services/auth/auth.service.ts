import bcrypt from 'bcrypt'

import { CustomerStatus } from '@/constants'
import {
  keysOfLoginDTO,
  LoginDTO,
} from '@/controllers/customer/auth/login/login.customer.dto'
import { LoginParams } from '@/controllers/customer/auth/login/login.customer.schema'
import {
  keysOfRegisterDTO,
  RegisterDTO,
} from '@/controllers/customer/auth/register/register.customer.dto'
import { RegisterParams } from '@/controllers/customer/auth/register/register.customer.schema'
import { Customer } from '@/models/customer/customer.model'
import { CustomerRepository } from '@/repositories/customer.repository'
import { getData } from '@/utils/get-data'

type InjectableDependencies = {
  customerRepository: typeof CustomerRepository
}

export default class AuthService {
  protected readonly _customerRepository: typeof CustomerRepository

  constructor({ customerRepository }: InjectableDependencies) {
    this._customerRepository = customerRepository
  }

  async login(loginParams: LoginParams): Promise<LoginDTO> {
    const customerFind = await this._customerRepository.findOne({
      where: { email: loginParams.email },
    })
    if (!customerFind || customerFind.status !== CustomerStatus.ACTIVE) {
      throw new Error('Customer not found.')
    }
    const isPasswordValid = await bcrypt.compare(
      loginParams.password,
      customerFind.password,
    )
    if (!isPasswordValid) {
      throw new Error('Email or password incorrect.')
    }

    return getData<Customer, LoginDTO>(customerFind, keysOfLoginDTO)
  }

  async register(registerParams: RegisterParams): Promise<RegisterDTO> {
    const { email, password } = registerParams
    // check account exist
    const customerFind = await this._customerRepository.findOne({
      where: { email },
    })
    if (!!customerFind) {
      throw new Error('Customer is already exist')
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const customerCreated = this._customerRepository.create({
      ...registerParams,
      password: passwordHash,
    })
    const customer = await this._customerRepository.save(customerCreated)
    return getData<Customer, RegisterDTO>(customer, keysOfRegisterDTO)
  }
}
