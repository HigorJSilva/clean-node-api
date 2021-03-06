import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), {
  id: 'any_id'
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})
