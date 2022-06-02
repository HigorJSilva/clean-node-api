import { makeLoginValidation } from './login-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
