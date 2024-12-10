import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { User, UserRole } from "../entities/user.entity";
import ForbiddenError from "../exceptions/forbidden-exception";
import UserAlreadyExistsException from "../exceptions/user-exists-exception";

// TODO types (no any)
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(user: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(existingUser.email);
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.create(user);
  }

  async findAll(user: any): Promise<User[]> {
    const isUser = user?.role === UserRole.USER;

    if (isUser) {
      throw new ForbiddenError();
    }

    return this.userRepository.findAll();
  }

  async findById(user: any, id: number): Promise<User | undefined> {
    const isUser = user?.role === UserRole.USER;

    if (isUser && user?.id !== id) {
      throw new ForbiddenError();
    }

    return this.userRepository.findById(id);
  }

  async update(id: number, user: any, data: Partial<User>): Promise<void> {
    const isUser = user?.role === UserRole.USER;

    if (isUser && user?.id !== id) {
      throw new ForbiddenError();
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.update(id, data);
  }

  async deleteById(id: number, user: any): Promise<void> {
    const isUser = user?.role === UserRole.USER;

    if (isUser || user?.id === id) {
      throw new ForbiddenError();
    }

    await this.userRepository.deleteById(id);
  }
}
