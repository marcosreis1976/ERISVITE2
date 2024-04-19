export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  affiliated?: any;
}

export interface signInType {
  title?: string;
}

export type UserType = {
  userName: String,
  filialUsuario: Number,
  token: String
}
