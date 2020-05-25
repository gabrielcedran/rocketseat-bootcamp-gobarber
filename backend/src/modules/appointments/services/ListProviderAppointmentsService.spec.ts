import CacheProviderMock from "@shared/container/providers/CacheProvider/mocks/CacheProviderMock";
import AppointmentsRepositoryMock from "../repositories/mocks/AppointmentsRepositoryMock";
import ListProviderAppointmentsService from "./ListProviderAppointmentsService";

let appointmentsRepository: AppointmentsRepositoryMock;
let cacheProviderMock: CacheProviderMock;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe("ListProviderAppointmentsService", () => {
  beforeEach(() => {
    appointmentsRepository = new AppointmentsRepositoryMock();
    cacheProviderMock = new CacheProviderMock();
    listProviderAppointmentsService = new ListProviderAppointmentsService(appointmentsRepository, cacheProviderMock);
  });

  it("should be able to list the provider appointments for a given day", async () => {
    const appointmentsCached = jest.spyOn(cacheProviderMock, "put");
    const appointment1 = await appointmentsRepository.create({
      providerId: "provider",
      userId: "userId",
      dateTime: new Date(2019, 6, 4, 10),
    });
    const appointment2 = await appointmentsRepository.create({
      providerId: "provider",
      userId: "userId",
      dateTime: new Date(2019, 6, 4, 14),
    });
    const appointment3 = await appointmentsRepository.create({
      providerId: "provider",
      userId: "userId",
      dateTime: new Date(2019, 6, 4, 15),
    });

    const appointments = await listProviderAppointmentsService.execute({
      providerId: "provider",
      year: 2019,
      month: 7,
      day: 4,
    });

    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2, appointment3]));
    expect(appointmentsCached).toBeCalled();
  });
});
