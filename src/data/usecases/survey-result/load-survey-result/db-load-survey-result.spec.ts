import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult usecase', () => {
  test('Should call LoadSurveyResultRepository with correct value', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadByIdSurveySpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_surveyId')
    expect(loadByIdSurveySpy).toHaveBeenCalledWith('any_surveyId')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)

    const promise = sut.load('any_surveyId')
    await expect(promise).rejects.toThrow()
  })
})
