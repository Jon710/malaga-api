I could've gone with a simple MVC, but it doesn't really separate responsabilities and  doesn't help testing. Meanwhile, this layered architecture (controller -> service -> repository) lets each component do its own task and helps when testing. If the project were bigger and the team had the knowledge, we could think of Hexagonal or Clean arch/
- avoid too many indirections when it's not needed. be careful when only adding complexity instead of solving the actual problem
- validation at the edge (boundaries of the system - input/output)
- improvement: if there were more, i'd group features by modules (auth, users, appointments, etc...)

- **Reason for Choosing Layered Architecture**:
  - I chose a layered architecture (controller -> service -> repository) because it provides a clear separation of concerns. Each layer has a specific responsibility, which makes the codebase more maintainable and testable.
  - In contrast to a simple MVC architecture, which can sometimes blur the lines between different responsibilities, a layered architecture ensures that each component does its own task. This separation helps in isolating business logic from data access logic and presentation logic.
- **Testing Benefits**:
  - This architecture facilitates unit testing by allowing each layer to be tested independently. For example, services can be tested without involving the database by mocking the repository layer.
  - My experience at ICM taught me the importance of having a testable architecture. By isolating different layers, we can write more focused and reliable tests.
- **Scalability and Flexibility**:
  - While a layered architecture is suitable for this project, it also provides a foundation for scaling the application. If the project grows, we can consider more advanced architectures like Hexagonal or Clean Architecture. However, for the current scope, these would be overkill and add unnecessary complexity.
## Avoiding Unnecessary Indirections
  - It's important to avoid adding too many indirections when they are not needed. Each layer and abstraction should have a clear purpose and solve a specific problem.
  - Adding complexity without a clear benefit can make the code harder to understand and maintain.
## Validation at the Edge
- **Input and Output Validation**:
  - Validating data at the boundaries of the system (e.g., input validation in controllers) ensures that invalid data does not propagate through the layers. This approach helps in maintaining data integrity and prevents potential bugs.
  - By using libraries like Zod for schema validation, we can enforce data constraints and provide meaningful error messages to the client.

## SOLID Principles
- **Single Responsibility Principle (SRP)**: makes the code easier to understand, maintain, and test.
  - Each class and module in the application has a single responsibility. For example, the `UserService` handles business logic related to users, while the `UserRepository` handles data access.
- **Open/Closed Principle (OCP)**:
  - The application is designed to be open for extension but closed for modification. For example, new features can be added by extending existing classes or adding new ones without modifying the existing codebase. This principle helps in reducing the risk of introducing bugs when adding new functionality.
- **Liskov Substitution Principle (LSP)**:
  - The application adheres to LSP by ensuring that subclasses or derived classes can be used interchangeably with their base classes without affecting the correctness of the program. For example, different types of repositories can be used interchangeably as long as they adhere to the same interface.
- **Interface Segregation Principle (ISP)**:
  - The application follows ISP by defining small, specific interfaces rather than large, general-purpose ones. This approach ensures that classes only implement the methods they need. For example, the `UserRepository` interface defines methods specific to user data access, without including unrelated methods.
- **Dependency Inversion Principle (DIP)**:
  - The application follows DIP by depending on abstractions (interfaces) rather than concrete implementations. This approach makes the code more flexible and easier to test.
  - For example, the `UserService` depends on the `UserRepository` interface, allowing different implementations of the repository to be injected.
  - O jeito mais simples de entender DI é pensar que é literalmente passar informações por parâmetro ao invés de escopo. Ao meu ver, o motivo mais direto para utilizarmos DI é que facilita a utilização mocks para construção de unit tests.

## DRY Principle - Don't Repeat Yourself:
  - The application adheres to the DRY principle by avoiding code duplication. Common functionality is extracted into reusable functions or classes.
  - For example, input validation logic is centralized using middleware, ensuring that validation rules are defined in one place and reused across different routes.

# Event loop
Non-blocking I/O -> it's Nodejs capacity of handling I/O operations simultaneously. This happens whenever we use async/await, promises, etc. Promises don't block the event loop. What blocks it is CPU-heavy computations, sync operations... How to deal with this? Pense que uma operação não I/O está ali consumindo muito tempo de processamento. 
Uma opção pesada pode ser transformada em uma operação I/O... Como? O caminho mais fácil é tirá-la do sistema principal e colocá-la em um serviço separado. 
Dessa forma, a aplicação principal irá tratá-la como uma promise e seu event loop ficará liberado. Outras táticas para lidar com melhoria de performance de operações síncronas são isolá-las em um Child Process ou utilizar um Worker. 
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that a single JavaScript thread is used by default — by offloading operations to the system kernel whenever possible.

Ipv4 vs Ipv6