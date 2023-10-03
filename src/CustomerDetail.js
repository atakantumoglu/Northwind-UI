import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #2D142C;  // Farklı bir arka plan rengi
    border-radius: 8px;
`;

const Input = styled.input`
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #801336;  // İnput'un kenarlık rengi
    border-radius: 5px;
    margin-top: 10px;
    width: 100%;
    background-color: #510A32;  // Input'un arka plan rengi
    color: white;  // Yazı rengi
    &:focus {
        border-color: #C72C41;  // Odaklandığında kenarlık rengi
    }
`;

const Button = styled.button`
    box-sizing: border-box;
    display: block;
    padding: 10px 15px;
    background-color: #C72C41;  // Butonun arka plan rengi
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
    &:hover {
        background-color: #EE4540;  // Butonun üzerine geldiğinde arka plan rengi
    }
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #EE4540;  // Başlık rengi
    border-bottom: 3px solid #801336;  // Alt çizgi rengi
    padding-bottom: 10px;
`;

const DataLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-top: 10px;
    color: #C72C41;  // Etiket rengi
`;


function CustomerDetail() {
    const { customerId } = useParams();
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [originalData, setOriginalData] = useState(null);
    const {currentUser} = useAuth();
    useEffect(() => {
        async function fetchCustomerDetail() {
            try {
                const response = await axios.get(`https://localhost:44323/api/customer/get-by-id?customerId=${customerId}`,{
                    headers: {
                        'Authorization': `Bearer ${currentUser}`  
                    }
                });
                setCustomerData(response.data.data);
                setOriginalData(response.data.data); 
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting to API!", error);
                setLoading(false);
            }
        }
        fetchCustomerDetail();
    }, [customerId]);

    const hasDataChanged = () => {
        return JSON.stringify(originalData) !== JSON.stringify(customerData);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put('https://localhost:44323/api/customer', customerData, {
                headers: {
                    'Authorization': `Bearer ${currentUser}`  // Token'ı başlığa ekleyerek isteği yap
                }
            });
            if (response.data) {
                alert("Customer updated successfully!");
            }
        } catch (error) {
            alert("An error occurred while updating the customer.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title>Customer Information</Title>

            {customerData && (
                <div>
                    <DataLabel>Company Name:</DataLabel>
                    <Input
                        type="text"
                        name="companyName"
                        value={customerData.companyName}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Contact Name:</DataLabel>
                    <Input
                        type="text"
                        name="contactName"
                        value={customerData.contactName}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Company Title:</DataLabel>
                    <Input
                        type="text"
                        name="contactTitle"
                        value={customerData.contactTitle}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Address:</DataLabel>
                    <Input
                        type="text"
                        name="address"
                        value={customerData.address}
                        onChange={handleInputChange}
                    />

                    <DataLabel>City:</DataLabel>
                    <Input
                        type="text"
                        name="city"
                        value={customerData.city}
                        onChange={handleInputChange}
                    />
                    
                    <DataLabel>Region:</DataLabel>
                    <Input
                        type="text"
                        name="region"
                        value={customerData.region}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Postal Code:</DataLabel>
                    <Input
                        type="text"
                        name="postalCode"
                        value={customerData.postalCode}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Country:</DataLabel>
                    <Input
                        type="text"
                        name="country"
                        value={customerData.country}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Phone:</DataLabel>
                    <Input
                        type="text"
                        name="phone"
                        value={customerData.phone}
                        onChange={handleInputChange}
                    />

                    <DataLabel>Fax:</DataLabel>
                    <Input
                        type="text"
                        name="fax"
                        value={customerData.fax}
                        onChange={handleInputChange}
                    />

                     <Button onClick={handleUpdate} disabled={!hasDataChanged()}>Update Customer</Button>
                    <Link to="/customers">
                        <Button>Back to Customer List</Button>
                    </Link>
                </div>
            )}
        </Container>
    );
}

export default CustomerDetail;