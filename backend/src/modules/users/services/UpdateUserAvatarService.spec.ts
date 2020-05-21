import ApplicationError from "@shared/errors/ApplicationError";
import StorageProviderMock from "@shared/container/providers/StorageProvider/mock/StorageProviderMock";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let usersRepositoryMock: UsersRepositoryMock;
let storageProviderMock: StorageProviderMock;
let updateUserAvatarService: UpdateUserAvatarService;

describe("Update Avatar", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    storageProviderMock = new StorageProviderMock();
    updateUserAvatarService = new UpdateUserAvatarService(usersRepositoryMock, storageProviderMock);
  });
  it("should be able to add avatar to user without avatar", async () => {
    const user = await usersRepositoryMock.create({ name: "Mary", email: "don@bob.com", password: "1234" });

    await updateUserAvatarService.execute({ userId: user.id, avatarFilename: "donbob.png" });

    expect(user.avatar).toEqual("donbob.png");
  });

  it("should be able to update avatar to user with avatar", async () => {
    const deleteFile = jest.spyOn(storageProviderMock, "deleteFile");

    const user = await usersRepositoryMock.create({ name: "Mary", email: "don@bob.com", password: "1234" });

    await updateUserAvatarService.execute({ userId: user.id, avatarFilename: "donbob.png" });
    expect(user.avatar).toEqual("donbob.png");

    await updateUserAvatarService.execute({ userId: user.id, avatarFilename: "donbob2.png" });
    expect(user.avatar).toEqual("donbob2.png");
    expect(deleteFile).toHaveBeenCalledWith("donbob.png");
  });

  it("should not be able to add avatar to invalid user", async () => {
    await expect(updateUserAvatarService.execute({ userId: "123", avatarFilename: "donbob.png" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
