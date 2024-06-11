import { IPlan, IPlanCode } from '../plan'

export interface IOrg {
  id: string
  name: string
  code: string
  createAt: string
  updatedAt: string
  currentPlan: {
    id: string
    plan: IPlan
  }
}

export type OrgFindAllQuery = {
  ResponseType: IOrg[]
  ParamType: {
    access_token: string
  }
}

export type OrgFindOneQuery = {
  ResponseType: IOrg
  ParamType: {
    orgCode: string
  }
}

export type OrgCreateQuery = {
  ResponseType: IOrg
  ParamType: {
    access_token: string
    orgName: string
    code: string
    userName: string
    userEmail: string
    userPassword: string
    planCode: IPlanCode
  }
}

export type OrgUpdateQuery = {
  ResponseType: IOrg
  ParamType: {
    id: string
    access_token: string
    name: string
    updateCode: string
    planCode: string
  }
}

export type OrgDeleteQuery = {
  ResponseType: IOrg
  ParamType: {
    access_token: string
    code: string
  }
}
