import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CustomerDetail from './CustomerDetail';
import CustomerList from './CustomerList';
import Navbar from './Navbar';
import Signup from './Signup';
import { AuthProvider } from './AuthContext'; // AuthContext'in yolunu doğru bir şekilde ekleyin
import CreateCustomer from './CreateCustomer';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/customer/:customerId" element={<CustomerDetail />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-customer" element={<CreateCustomer />} />
                    {/* Diğer rotalarınızı buraya ekleyin */}
                    {/* Varsayılan olarak / yolunda bir şey tanımlı değilse aşağıdaki gibi bir yönlendirme ekleyebilirsiniz. */}
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
