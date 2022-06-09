import { Collection } from 'mongodb'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  })
  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey)
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(account)
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()

      const surveyResult = await sut.save({
        surveyId: survey.id.toString(),
        accountId: account.id.toString(),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult?.id).toBeTruthy()
      expect(surveyResult?.answer).toBe(survey.answers[0].answer)
    })
  })

  describe('update()', () => {
    test('Should update a survey result if its not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const res = await sut.save({
        surveyId: survey.id.toString(),
        accountId: account.id.toString(),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await sut.save({
        surveyId: survey.id.toString(),
        accountId: account.id.toString(),
        answer: survey.answers[1].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult?.answer).toBe(survey.answers[1].answer)
      expect(surveyResult?.id).toEqual(res.id)
    })
  })
})