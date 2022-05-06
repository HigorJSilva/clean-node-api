import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidatorStub: EmailValidator

  constructor (emailValidatorStub: EmailValidator) {
    this.emailValidatorStub = emailValidatorStub
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return new Promise(resolve => resolve(badRequest(new MissingParamError(field))))
        }
      }

      const isValid = this.emailValidatorStub.isValid(httpRequest.body.email)
      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }

      return new Promise(resolve => resolve(ok('email')))
    } catch (error) {
      return serverError(new Error())
    }
  }
}
