export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt?: Date
  updateAt?: Date
}

export interface Department {
  id: number
  name: string
  parentId?: any
  createAt?: Date
  updateAt?: Date
  leader: string
}

export interface RootObject {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt?: Date
  updateAt?: Date
  role: Role
  dapartment: Department
}
