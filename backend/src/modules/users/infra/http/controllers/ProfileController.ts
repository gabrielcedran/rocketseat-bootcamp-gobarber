import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);

    const { name, email, oldPassword, password } = request.body;

    const user = await updateProfile.execute({ userId: request.user.id, name, email, oldPassword, password });

    delete user.password;

    return response.status(200).json(user);
  }
}

export default ProfileController;
