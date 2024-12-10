// import { UserService } from "../services/userService";
// import { UserRepository } from "../repositories/userRepository";
// import { User } from "../domain/entities/userEntity";

// jest.mock("../repositories/userRepository");

// describe("UserService", () => {
//   let userService: UserService;
//   let userRepository: jest.Mocked<UserRepository>;

//   beforeEach(() => {
//     userRepository = new UserRepository() as jest.Mocked<UserRepository>;
//     userService = new UserService(userRepository);
//   });

//   it("should create a user", async () => {
//     const user: User = {
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "password",
//       role: "USER",
//     };

//     userRepository.create.mockResolvedValue({ ...user, id: 1 });

//     const createdUser = await userService.createUser(user);

//     expect(createdUser).toHaveProperty("id");
//     expect(createdUser.name).toBe(user.name);
//   });
// });

describe("1 + 1", () => {
  it("should be 2", () => {
    expect(1 + 1).toBe(2);
  });
});
