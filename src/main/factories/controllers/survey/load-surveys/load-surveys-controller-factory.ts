import { makeLogControllerDecorator } from '../../../decorator/log-controller-decorator-factory'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-add-survey-factory '
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
