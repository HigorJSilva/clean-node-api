import { makeLogControllerDecorator } from '@/main/factories/decorator/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-add-survey-factory '
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
