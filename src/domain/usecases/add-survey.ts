export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
}

export interface SurveyAnswer {
  imahe: string
  answers: string
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void | null>
}
