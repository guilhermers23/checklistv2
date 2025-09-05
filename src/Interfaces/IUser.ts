export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  readonly password: string;
  admin: boolean;
}
