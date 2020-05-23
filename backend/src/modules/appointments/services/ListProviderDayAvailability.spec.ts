import AppointmentsRepositoryMock from "../repositories/mocks/AppointmentsRepositoryMock";
import ListProviderDayAvailability from "./ListProviderDayAvailability";

let appointmentsRepository: AppointmentsRepositoryMock;
let listProviderDayAvailability: ListProviderDayAvailability;

describe("ListProviderDayAvailability", () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepositoryMock();
    listProviderDayAvailability = new ListProviderDayAvailability(appointmentsRepository);
  });
  it("should be able to list the availability of a provider in a given day", async () => {
    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2020, 6, 4, 10, 0, 0) });
    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2020, 6, 4, 12, 0, 0) });

    const availabilityPerHour = await listProviderDayAvailability.execute({
      providerId: "id",
      day: 4,
      month: 7,
      year: 2020,
    });

    expect(availabilityPerHour).toEqual(
      expect.arrayContaining([
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false },
        { hour: 13, available: true },
      ]),
    );
  });
});
