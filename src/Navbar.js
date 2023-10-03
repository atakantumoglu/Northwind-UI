import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const NavbarStyled = styled.nav`
    display: flex;  // Bu özellik ile içerikleri kolayca düzenleyebiliriz
    justify-content: space-between; // İçerikleri iki uca yayar
    align-items: center; // İçerikleri dikey olarak merkezler
    background-color: #510a32;
    padding: 0 20px;  // Sağdan ve soldan biraz boşluk ekledik
    color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);  // Altta hafif bir gölge ekleyerek daha modern bir görünüm kazandırıyoruz
    transition: margin-left 0.3s; // Ekleyin
    margin-left: ${props => props.sidebarCollapsed ? '80px' : '250px'};
`;


const NavLinks = styled.div`
    display: flex; // İçerikleri yanyana diziyoruz
    gap: 15px;  // Linkler arasında boşluk bırakıyoruz
`;

const NavLink = styled(Link)`
    padding: 10px;  // Her bir link için biraz padding ekleyerek tıklanabilir alanı büyüttük
    color: white;
    text-decoration: none;
    border-radius: 4px;  // Hafif bir yuvarlak köşe ekleyerek daha modern bir his veriyoruz

    &:hover {
        background-color: rgba(255, 255, 255, 0.1); // Fareyle üzerine gelindiğinde hafif bir arkaplan rengi ekliyoruz
    }
`;

const Navbar = ({ sidebarCollapsed }) => { // sidebarCollapsed prop'ını ekleyin
    const { currentUser } = useAuth();
    return (
        <NavbarStyled sidebarCollapsed={sidebarCollapsed}>
            <NavLinks>
                <NavLink to="/customers">Customers</NavLink>
                <NavLink to="/create-customer">Create Customer</NavLink>
            </NavLinks>
            {!currentUser && <NavLink to="/signup">Signup</NavLink>}
        </NavbarStyled>
    );
}

export default Navbar;
