export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  access_token?: string;
}
