import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encryper: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encryper: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encryper = encryper
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashed_password = await this.encryper.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashed_password }))

    const temp = {
      id: 'string',
      name: 'string',
      email: 'string',
      password: 'string'
    }

    return new Promise(resolve => resolve(temp))
  }
}
