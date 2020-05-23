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
    jest.spyOn(Date, "now").mockImplementationOnce(() => new Date(2019, 6, 4, 8, 30, 0).getTime());

    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2019, 6, 4, 10, 0, 0) });
    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2019, 6, 4, 12, 0, 0) });
    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2019, 6, 4, 16, 0, 0) });

    const availabilityPerHour = await listProviderDayAvailability.execute({
      providerId: "id",
      day: 4,
      month: 7,
      year: 2019,
    });

    expect(availabilityPerHour).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
