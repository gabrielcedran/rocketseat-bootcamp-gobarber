import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import ShowProfileService from "@modules/users/services/ShowProfileService";

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const userId = request.user.id;
    const user = await showProfile.execute({ userId });
    delete user.password;
    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);

    const { name, email, oldPassword, password } = request.body;

    const user = await updateProfile.execute({ userId: request.user.id, name, email, oldPassword, password });

    delete user.password;

    return response.status(200).json(user);
  }
}

export default ProfileController;
