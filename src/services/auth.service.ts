import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.create(user);
  }
}
