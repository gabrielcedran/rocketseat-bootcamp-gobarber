import { ObjectID } from "mongodb";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";
import INotificationsRepository from "../INotificationsRepository";

export default class NotificationsRepositoryMock implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({ recipientId, content }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { recipientId, content, id: new ObjectID() });

    this.notifications.push(notification);

    return notification;
  }
}
