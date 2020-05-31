import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import goBarberApi from '../../services/goBarberApi';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './Dashboard.styles';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    goBarberApi
      .get(`/providers/${user?.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user]);

  // This is a hook in order to perform data transformation outside the JSX response so that impact in performance is reduced
  // Any data transformation within the component response will be recalculated (or redone) every time a state changes.
  // useMemo is similar to use callback for functions.
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(dayAvailability => !dayAvailability.available)
      .map(dayAvailability => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, dayAvailability.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="Logo GoBarber" />
          <Profile>
            <img src={user?.avatarUrl} alt={user?.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{user?.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horário agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user?.avatarUrl} alt={user?.name} />
              <strong>{user?.name}</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhā</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img src={user?.avatarUrl} alt={user?.name} />
                <strong>{user?.name}</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img src={user?.avatarUrl} alt={user?.name} />
                <strong>{user?.name}</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img src={user?.avatarUrl} alt={user?.name} />
                <strong>{user?.name}</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
