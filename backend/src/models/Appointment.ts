import { uuid } from "uuidv4";

class Appointment {
  id: string;

  provider: string;

  dateTime: Date;

  // To receive the entity attributes as parameter and use the class itself as base
  // but hide the attributes which should not be received, there is a javascript type
  // called Omit, which receives as content the type which will be be received and
  // the attributes that should be hidden
  constructor({ provider, dateTime }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.dateTime = dateTime;
  }
}

export default Appointment;
