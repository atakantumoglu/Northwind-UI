import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUsers, FaPlusSquare, FaBars, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

const SidebarContainer = styled.div`
    background-color: #2D142C;
    width: ${props => props.collapsed ? '80px' : '250px'};
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width 0.3s;
    z-index: 0;
    flex-shrink: 0; // Bu, Sidebar'ın genişliğini sabit tutar
`;

const SidebarLogo = styled.img`
    width: 50%;
    margin: 20px auto;
    display: block;
`;

const SidebarLink = styled(Link)`
    display: block;
    color: white;
    padding: 10px 15px;
    text-decoration: none;
    &:hover {
        background-color: #510A32;
    }
`;

const CollapseButton = styled.button`
    background: none;
    bottom: 0;
    border: none;
    color: white;
    padding: 10px 15px;
    width: 100%;
    cursor: pointer;
    font-size: 16px;
`;

const LogoutButton = styled.button`
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    padding: 15px 0;
    background-color: #C72C41;
    color: white;
    border: none;
    cursor: pointer;
    
`;

const Sidebar = ({ collapsed: externalCollapsed, setCollapsed: setExternalCollapsed }) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);

    const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
    const setCollapsed = setExternalCollapsed || setInternalCollapsed;

    const { logout } = useAuth();

    return (
        <SidebarContainer collapsed={collapsed}>
            <SidebarLogo src="/northwindtraderslogo.jpg" alt="Logo" />

            <SidebarLink to="/customers">
                <FaUsers /> {/* Müşteriler için simge */}
                {!collapsed && " Customers"}
            </SidebarLink>

            <SidebarLink to="/create-customer">
                <FaPlusSquare /> {/* Müşteri Oluştur için simge */}
                {!collapsed && " Create Customer"}
            </SidebarLink>

            <CollapseButton onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
            </CollapseButton>

            <LogoutButton onClick={logout}>Logout</LogoutButton>
        </SidebarContainer>
    );
}

export default Sidebar;
