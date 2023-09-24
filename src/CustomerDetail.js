import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #f3f3f3;
    border-radius: 8px;
`;

const Button = styled.button`
    display: block;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #000ff0;
    border-bottom: 5px solid #eee;
    padding-bottom: 10px;
`;

const DataLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-top: 10px;
`;

function CustomerDetail() {
    const { id } = useParams(); // URL'den gelen müşteri ID'sini al
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomerDetail() {
            try {
                const response = await axios.get(`https://localhost:44323/customer/get-by-id?customerId=${id}`);
                setCustomerData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting to API!", error);
                setLoading(false);
            }
        }

        fetchCustomerDetail();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title>Customer Information</Title>

            {customerData && (
                <div>
                    <p><DataLabel>Company Name:</DataLabel> {customerData.companyName}</p>
                    <p><DataLabel>Contact Name:</DataLabel> {customerData.contactName}</p>
                    <p><DataLabel>Company Title:</DataLabel> {customerData.contactTitle}</p>
                    <p><DataLabel>Address:</DataLabel> {customerData.address}</p>
                    <p><DataLabel>City:</DataLabel> {customerData.city}</p>
                    <p><DataLabel>Region:</DataLabel> {customerData.region}</p>
                    <p><DataLabel>Postal Code:</DataLabel> {customerData.postalCode}</p>
                    <p><DataLabel>Country:</DataLabel> {customerData.country}</p>
                    <p><DataLabel>Phone:</DataLabel> {customerData.phone}</p>
                    <p><DataLabel>Fax:</DataLabel> {customerData.fax}</p>
                    <Link to="/customers">
                        <Button>Back to Customer List</Button>
                    </Link>
                </div>
            )}
        </Container>
    );
}

export default CustomerDetail;
