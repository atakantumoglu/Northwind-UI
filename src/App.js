import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerDetail from './CustomerDetail';
import CustomerList from './CustomerList';
import CreateCustomer from './CreateCustomer';
import Navbar from './Navbar';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customer/:id" element={<CustomerDetail />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Routes>
        </Router>
    );
}

export default App;
