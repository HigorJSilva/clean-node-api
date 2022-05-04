import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encryper: Encrypter

  constructor (encryper: Encrypter) {
    this.encryper = encryper
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encryper.encrypt(account.password)

    const temp = {
      id: 'string',
      name: 'string',
      email: 'string',
      password: 'string'
    }

    return new Promise(resolve => resolve(temp))
  }
}
