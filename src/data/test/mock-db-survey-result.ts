
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResultParams, SurveyResultModel } from '../usecases/survey-result/save-survey-result/db-save-survey-survey-result-protocols'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class AddSurveyRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyRepositoryStub()
}
