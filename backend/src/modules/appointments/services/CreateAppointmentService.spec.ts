import ApplicationError from "@shared/errors/ApplicationError";
import AppointmentsRepositoryMock from "../repositories/mocks/AppointmentsRepositoryMock";
import CreateAppointmentService from "./CreateAppointmentService";

let appointmentsRepositoryMock: AppointmentsRepositoryMock;
let createAppointmentService: CreateAppointmentService;


// The describe function is used to group tests, rather then leaving them scatered in the file
describe("CreateAppointment", () => {

  beforeEach(() => {
    appointmentsRepositoryMock = new AppointmentsRepositoryMock();
    createAppointmentService = new CreateAppointmentService(appointmentsRepositoryMock);
  });

  // The same as test, but with a better semantic to readability, even in the tests report
  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => new Date(2020, 6, 4, 9).getTime());
    const appointment = await createAppointmentService.execute({
      providerId: "1",
      userId: "2",
      dateTime: new Date(2020, 6, 4, 10),
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.providerId).toBe("1");
    expect(appointment.userId).toBe("2");
  });

  it("should not be able to create two appointments at the same time", async () => {
    jest.spyOn(Date, "now").mockImplementation(() => new Date(2020, 4, 10, 10).getTime());
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({ providerId: "1", userId: "2", dateTime: appointmentDate });

    await expect(
      createAppointmentService.execute({ providerId: "1", userId: "3", dateTime: appointmentDate }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create an appointment in a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await expect(
      createAppointmentService.execute({
        dateTime: new Date(2020, 4, 10, 11),
        providerId: "providerId",
        userId: "userId",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create an appointment with the user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => new Date(2020, 4, 10, 10).getTime());

    await expect(
      createAppointmentService.execute({
        dateTime: new Date(2020, 4, 10, 11),
        providerId: "providerId",
        userId: "providerId",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create an appointment before 8am", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => new Date(2020, 4, 10, 1).getTime());

    await expect(
      createAppointmentService.execute({
        dateTime: new Date(2020, 4, 10, 7),
        providerId: "providerId",
        userId: "userId",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it("should not be able to create an appointment after 17am", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => new Date(2020, 4, 10, 1).getTime());

    await expect(
      createAppointmentService.execute({
        dateTime: new Date(2020, 4, 10, 18),
        providerId: "providerId",
        userId: "userId",
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
