export interface userType {
  id: string;
  avatar: string;
  name: string;
  role: string;
  country: string;
  isFollowed: boolean;
}

export interface GallaryType {
  id: string;
  cover: string;
  name: string;
  time: string;
}

export interface IUser{
  userName?: string;
  filialUsuario?: number;
  token?: string;
  usaWmsComMascara?:boolean;
  liberaQuantidadeInventario?:boolean;
  usaWmsPorSetor?:boolean;
  nomeFilial?: string
}
