import AppointmentsRepositoryMock from "../repositories/mocks/AppointmentsRepositoryMock";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let appointmentsRepository: AppointmentsRepositoryMock;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe("ListProviderMonthAvailabilityService", () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepositoryMock();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(appointmentsRepository);
  });

  it("should be able to list the days which the provider is still available in a given month", async () => {
    for (let hour = 8; hour <= 17; hour += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2020, 6, 4, hour, 0, 0) });
      // eslint-disable-next-line no-await-in-loop
      await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2020, 6, 5, hour, 0, 0) });
    }
    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2020, 6, 6, 10, 0, 0) });
    await appointmentsRepository.create({ providerId: "id", dateTime: new Date(2020, 7, 5, 10, 0, 0) });

    const availability = await listProviderMonthAvailabilityService.execute({ providerId: "id", month: 7, year: 2020 });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 3, available: true },
        { day: 4, available: false },
        { day: 5, available: false },
        { day: 6, available: true },
      ]),
    );
  });
});
