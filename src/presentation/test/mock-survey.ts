import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'
import { AddSurvey, AddSurveyParams } from '../controllers/survey/add-survey/add-survey-controller-protocols'
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/load-survey-controller-protocols'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveyModels()))
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel | null> {
      return new Promise(resolve => resolve(mockSurveyModel()))
    }
  }
  return new LoadSurveyByIdStub()
}
