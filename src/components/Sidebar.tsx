import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #17153B;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const SidebarItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    color: #C8ACD6;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <h1>Menu</h1>
      <SidebarItem>Dashboard</SidebarItem>
      <SidebarItem>Analytics</SidebarItem>
      <SidebarItem>Settings</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
