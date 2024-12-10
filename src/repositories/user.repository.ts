import knex from "../db/knex";
import { User } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const [createdUser] = await knex("users").insert(user).returning("*");
    return createdUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await knex("users").where({ email }).first();
    return user;
  }

  async findAll(): Promise<User[]> {
    return knex("users").select("id", "name", "email", "role", "access_token");
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await knex("users").where({ id }).first();
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await knex("users").where({ id }).update(user);
  }

  async deleteById(id: number): Promise<void> {
    await knex("users").where({ id }).del();
  }
}
