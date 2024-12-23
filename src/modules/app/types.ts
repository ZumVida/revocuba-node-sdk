export interface IApplication {
  id: string;
  name: string;
  active: boolean;
  settings: IApplicationSettings | null;
}

export interface IApplicationSettings {}
