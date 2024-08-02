import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  width: 97.2%;
  height: 60px;
  background-color: #2E236C;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-family: Inter;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <h1>Dashboard</h1>
    </NavbarContainer>
  );
};

export default Navbar;

