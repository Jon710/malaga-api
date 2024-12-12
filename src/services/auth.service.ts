import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "./user.service";

export class AuthService {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor(userRepository: UserRepository, userService: UserService) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      await this.userRepository.update(user.id!, { access_token: token });
      return token;
    }
    return null;
  }

  async register(user: User): Promise<User> {
    return this.userService.create(user);
  }
}
