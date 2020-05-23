import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import ShowProfileService from "./ShowProfileService";
import ApplicationError from "@shared/errors/ApplicationError";

let usersRepository: UsersRepositoryMock;
let showProfileService: ShowProfileService;

describe("ShowProfileService", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryMock();
    showProfileService = new ShowProfileService(usersRepository);
  });

  it("should be able to fetch user profile details", async () => {
    const createdUser = await usersRepository.create({ name: "Neto", email: "neto@neto.com", password: "123456" });

    const user = await showProfileService.execute({ userId: createdUser.id });

    expect(user.name).toBe("Neto");
    expect(user.email).toBe("neto@neto.com");
  });

  it("should return error when user id is not existent", async () => {
    await expect(showProfileService.execute({ userId: "not existent" })).rejects.toBeInstanceOf(ApplicationError);
  });
});
