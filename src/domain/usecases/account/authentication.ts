export type AuthenticationtParams = {
  email: string
  password: string
}
export interface Authentication {
  auth (authentication: AuthenticationtParams): Promise<string | null>
}
