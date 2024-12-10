import { User } from "../entities/user.entity";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  update(id: number, user: Partial<User>): Promise<void>;
  deleteById(id: number): Promise<void>;
}
