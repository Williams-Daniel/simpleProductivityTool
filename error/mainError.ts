export enum HTTP {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
}
export interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

export class mainError extends Error{
    public readonly name: string;
    public readonly message: string;
    public readonly status: HTTP;
    public readonly success: boolean;
}