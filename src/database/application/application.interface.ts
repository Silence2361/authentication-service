export interface IApplication {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
}

export interface ICreateApplication {
  name: string;
  description?: string;
  ownerId: number;
}

export interface ICreateApplicationResponse {
  id: number;
}

export interface IFindApplicationsResponse {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
}

export interface IFindApplicationById {
  id: number;
}

export interface IFindApplicationByIdResponse {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
}

export interface IUpdateApplication {
  name?: string;
  description?: string;
}

export interface IDeleteApplicationById {
  id: number;
}
