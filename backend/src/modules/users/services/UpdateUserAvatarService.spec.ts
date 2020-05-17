import StorageProviderMock from "@shared/container/providers/StorageProvider/mock/StorageProviderMock";
import UsersRepositoryMock from "../repositories/mock/UsersRepositoryMock";
import UpdateUserAvatarService from "./UpdateUserAvatarService";
import ApplicationError from "@shared/errors/ApplicationError";

describe("Update Avatar", () => {
  it("should be able to add avatar to user without avatar", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const storageProviderMock = new StorageProviderMock();
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepositoryMock, storageProviderMock);

    const user = await usersRepositoryMock.create({ name: "Mary", email: "don@bob.com", password: "1234" });

    await updateUserAvatarService.execute({ userId: user.id, avatarFilename: "donbob.png" });

    expect(user.avatar).toEqual("donbob.png");
  });

  it("should be able to update avatar to user with avatar", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const storageProviderMock = new StorageProviderMock();
    const deleteFile = jest.spyOn(storageProviderMock, "deleteFile");
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepositoryMock, storageProviderMock);

    const user = await usersRepositoryMock.create({ name: "Mary", email: "don@bob.com", password: "1234" });

    await updateUserAvatarService.execute({ userId: user.id, avatarFilename: "donbob.png" });
    expect(user.avatar).toEqual("donbob.png");

    await updateUserAvatarService.execute({ userId: user.id, avatarFilename: "donbob2.png" });
    expect(user.avatar).toEqual("donbob2.png");
    expect(deleteFile).toHaveBeenCalledWith("donbob.png");
  });

  it("should not be able to add avatar to invalid user", async () => {
    const usersRepositoryMock = new UsersRepositoryMock();
    const storageProviderMock = new StorageProviderMock();
    const updateUserAvatarService = new UpdateUserAvatarService(usersRepositoryMock, storageProviderMock);

    expect(updateUserAvatarService.execute({ userId: "123", avatarFilename: "donbob.png" })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
