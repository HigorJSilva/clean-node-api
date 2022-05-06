import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Usecase', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('errors')
    await accountCollection.deleteMany({})
  })
  test('should create an error logError on succes', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await accountCollection.countDocuments()
    expect(count).toBe(1)
  })
})
