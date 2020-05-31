import React, { useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
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

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
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
        <Calendar>calendar</Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
