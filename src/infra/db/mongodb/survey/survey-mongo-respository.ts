import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-survey-repository'
import { AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    const survey = await surveyCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(survey)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(result)
  }
}
