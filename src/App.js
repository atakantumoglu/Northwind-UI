import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CustomerDetail from './CustomerDetail';
import CustomerList from './CustomerList';
import Navbar from './Navbar';
import Signup from './Signup';
import { AuthProvider } from './AuthContext'; 
import CreateCustomer from './CreateCustomer';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
  transition: margin-left 0.3s; // Ekleyin
  margin-left: ${props => props.sidebarCollapsed ? '80px' : '250px'};
`;

function App() {
    const [collapsed, setCollapsed] = useState(false); 
    return (
        <AuthProvider>
            <Router>
                <Navbar sidebarCollapsed={collapsed} />
                <MainContainer>
                    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                    <MainContent sidebarCollapsed={collapsed}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/customers" element={<CustomerList />} />
                            <Route path="/customer/:customerId" element={<CustomerDetail />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/create-customer" element={<CreateCustomer />} />
                            <Route path="*" element={<Login />} />
                        </Routes>
                    </MainContent>
                </MainContainer>
            </Router>
        </AuthProvider>
    );
}

export default App;
