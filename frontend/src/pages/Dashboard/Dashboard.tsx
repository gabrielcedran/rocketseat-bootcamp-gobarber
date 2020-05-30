import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile } from './Dashboard.styles';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

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
    </Container>
  );
};

export default Dashboard;
