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
    const appointment = await createAppointmentService.execute({ providerId: "1", dateTime: new Date() });

    expect(appointment).toHaveProperty("id");
    expect(appointment.providerId).toBe("1");
  });

  it("should not be able to create two appointments at the same time", async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({ providerId: "1", dateTime: appointmentDate });

    expect(createAppointmentService.execute({ providerId: "1", dateTime: appointmentDate })).rejects.toBeInstanceOf(
      ApplicationError,
    );
  });
});
