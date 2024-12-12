import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";
import { User, UserRole } from "../entities/user.entity";
import UserAlreadyExistsException from "../exceptions/user-exists-exception";
import ForbiddenError from "../exceptions/forbidden-exception";
import NotFoundError from "../exceptions/not-found-exception";

jest.mock("knex", () => {
  return () => ({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
  });
});

jest.mock("../repositories/user.repository");

describe("UserService", () => {
  let userRepository: jest.Mocked<UserRepository>;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user: User = {
        id: 1,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.USER,
      };

      userRepository.findByEmail.mockResolvedValue(undefined);
      userRepository.create.mockResolvedValue(user);

      const result = await userService.create(user);

      expect(result).toEqual(user);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );
    });

    it("should throw an error if the email is already in use", async () => {
      const user: User = {
        id: 1,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.USER,
      };

      userRepository.findByEmail.mockResolvedValue(user);

      await expect(userService.create(user)).rejects.toThrow(
        UserAlreadyExistsException
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return all users for an admin", async () => {
      const users: User[] = [
        {
          id: 1,
          name: "João Luís",
          email: "joao@example.com",
          password: "password",
          role: UserRole.USER,
        },
        {
          id: 2,
          name: "Sarah Moraes",
          email: "sarah@example.com",
          password: "password",
          role: UserRole.ADMIN,
        },
      ];

      userRepository.findAll.mockResolvedValue(users);

      const result = await userService.findAll({ id: 2, role: UserRole.ADMIN });

      expect(result).toEqual(users);
      expect(userRepository.findAll).toHaveBeenCalled();
    });

    it("should throw an error if a user tries to access all users", async () => {
      await expect(
        userService.findAll({ id: 1, role: UserRole.USER })
      ).rejects.toThrow(ForbiddenError);
      expect(userRepository.findAll).not.toHaveBeenCalled();
    });
  });

  describe("findById", () => {
    it("should return the user if the user is an admin", async () => {
      const user: User = {
        id: 1,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.USER,
      };

      userRepository.findById.mockResolvedValue(user);

      const result = await userService.findById(
        { id: 2, role: UserRole.ADMIN },
        1
      );

      expect(result).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should return the user if the user is accessing their own details", async () => {
      const user: User = {
        id: 1,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.USER,
      };

      userRepository.findById.mockResolvedValue(user);

      const result = await userService.findById(
        { id: 1, role: UserRole.USER },
        1
      );

      expect(result).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should throw a forbidden error if a user tries to access another user's details", async () => {
      await expect(
        userService.findById({ id: 1, role: UserRole.USER }, 2)
      ).rejects.toThrow(ForbiddenError);
      expect(userRepository.findById).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update the user if the user is an admin", async () => {
      const user: Partial<User> = { name: "João Luís Updated" };
      const existingUser: User = {
        id: 1,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.USER,
      };

      userRepository.findById.mockResolvedValue(existingUser);

      await userService.update(1, { id: 2, role: UserRole.ADMIN }, user);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.update).toHaveBeenCalledWith(1, user);
    });

    it("should update the user if the user is updating their own details", async () => {
      const user: Partial<User> = { name: "João Luís Updated" };
      const existingUser: User = {
        id: 1,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.USER,
      };

      userRepository.findById.mockResolvedValue(existingUser);

      await userService.update(1, { id: 1, role: UserRole.USER }, user);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.update).toHaveBeenCalledWith(1, user);
    });

    it("should throw a NotFoundError if the user does not exist", async () => {
      const user: Partial<User> = { name: "João Luís Updated" };

      userRepository.findById.mockResolvedValue(undefined);

      await expect(
        userService.update(1, { id: 2, role: UserRole.ADMIN }, user)
      ).rejects.toThrow(NotFoundError);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(userRepository.update).not.toHaveBeenCalled();
    });

    it("should throw an error if a user tries to update another user's details", async () => {
      const user: Partial<User> = { name: "João Luís Updated" };

      await expect(
        userService.update(2, { id: 1, role: UserRole.USER }, user)
      ).rejects.toThrow(ForbiddenError);
      expect(userRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteById", () => {
    it("should delete the user if the user is an admin", async () => {
      const existingUser: User = {
        id: 12,
        name: "João Luís",
        email: "joao@example.com",
        password: "password",
        role: UserRole.ADMIN,
      };

      userRepository.findById.mockResolvedValue(existingUser);

      await userService.deleteById(12, { id: 2, role: UserRole.ADMIN });

      expect(userRepository.findById).toHaveBeenCalledWith(12);
      expect(userRepository.deleteById).toHaveBeenCalledWith(12);
    });

    it("should throw an error if a user tries to delete another user", async () => {
      await expect(
        userService.deleteById(2, { id: 1, role: UserRole.USER })
      ).rejects.toThrow(ForbiddenError);
      expect(userRepository.deleteById).not.toHaveBeenCalled();
    });

    it("should throw an error if a user tries to delete themselves", async () => {
      await expect(
        userService.deleteById(1, { id: 1, role: UserRole.ADMIN })
      ).rejects.toThrow(ForbiddenError);
      expect(userRepository.deleteById).not.toHaveBeenCalled();
    });
  });
});
