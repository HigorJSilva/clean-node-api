
import { SaveSurveyResultRepository } from './db-save-survey-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-survey-result'
import MockDate from 'mockdate'
import { mockSurveyResultModel, mockSurveyResultParams, throwError } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call saveSurveyResultRepositoryStub with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should throw if saveSurveyResultRepositoryStub throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)

    const promise = sut.save(mockSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = await sut.save(mockSurveyResultParams())
    expect(surveyResultData).toEqual(mockSurveyResultModel())
  })
})
