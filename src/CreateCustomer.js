import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const FormRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const FormColumn = styled.div`
    width: 48%;
`;

const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #2D142C;  // Paletten aldığınız renklerden biri
    border-radius: 10px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
    color: #EE4540;  // Paletten aldığınız renklerden biri
`;

const DataLabel = styled.label`
    font-weight: bold;
    display: block;
    margin: 10px 0;
    color: #C72C41;  // Paletten aldığınız renklerden biri
`;

const Input = styled.input`
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border: 1px solid #801336;  // Paletten aldığınız renklerden biri
    border-radius: 5px;
    background-color: #510A32;  // Paletten aldığınız renklerden biri
    color: #EE4540;  // Paletten aldığınız renklerden biri
    transition: border-color 0.2s, background-color 0.2s;

    &:focus {
        border-color: #EE4540;  // Paletten aldığınız renklerden biri
        background-color: #801336;  // Paletten aldığınız renklerden biri
        outline: none;
    }
`;

const Button = styled.button`
    display: block;
    padding: 10px 15px;
    background-color: #EE4540;  // Paletten aldığınız renklerden biri
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;

    &:hover {
        background-color: #C72C41;  // Paletten aldığınız renklerden biri
    }
`;

function CreateCustomer() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        contactTitle: '',
        address: '',
        city: '',
        region: '',
        postalCode: '',
        country: '',
        phone: '',
        fax: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const {currentUser} = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:44323/api/customer', formData, {
                headers: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
            if (response.data) {
                alert("Customer created successfully!");
            }
        } catch (error) {
            alert("An error occurred while creating the customer.");
        }
    };

    return (
        <Container>
        <Title>Create Customer</Title>
        <form onSubmit={handleSubmit}>
            <FormRow>
                <FormColumn>
                    <DataLabel>Company Name *</DataLabel>
                    <Input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                    <DataLabel>Contact Name</DataLabel>
                    <Input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} />
                    <DataLabel>Contact Title</DataLabel>
                    <Input type="text" name="contactTitle" value={formData.contactTitle} onChange={handleInputChange} />
                    <DataLabel>Address</DataLabel>
                    <Input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                    <DataLabel>City</DataLabel>
                    <Input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                </FormColumn>
                <FormColumn>
                    <DataLabel>Region</DataLabel>
                    <Input type="text" name="region" value={formData.region} onChange={handleInputChange} />
                    <DataLabel>Postal Code</DataLabel>
                    <Input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                    <DataLabel>Country</DataLabel>
                    <Input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                    <DataLabel>Phone</DataLabel>
                    <Input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    <DataLabel>Fax</DataLabel>
                    <Input type="text" name="fax" value={formData.fax} onChange={handleInputChange} />
                </FormColumn>
            </FormRow>
            <Button type="submit">Create</Button>
        </form>
    </Container>
        
    );
}

export default CreateCustomer;
