import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = {
      _id: result.insertedId.toString(),
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }// result.ops[0]
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
