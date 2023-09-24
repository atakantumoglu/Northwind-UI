import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarStyled = styled.nav`
    background-color: #333;
    padding: 10px 0;
    color: white;
`;

const NavLink = styled(Link)`
    margin: 0 15px;
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Navbar = () => {
    return (
        <NavbarStyled>
            <NavLink to="/customers">Customers</NavLink>
        </NavbarStyled>
    );
}

export default Navbar;
