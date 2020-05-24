import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const {
      user: { id: userId },
      file: { filename: avatarFilename },
    } = request;

    const updatedUser = await updateUserAvatarService.execute({
      userId,
      avatarFilename,
    });

    return response.json(classToClass(updatedUser));
  }
}

export default UserAvatarController;
