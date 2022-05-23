export class EmailInUseError extends Error {
  constructor () {
    super('Email already in Use')
    this.name = 'EmailInUseError'
  }
}
