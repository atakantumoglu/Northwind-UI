import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FormColumn = styled.div`
    width: 48%; // iki sütun arasında boşluk bırak
`;
const Container = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border-radius: 8px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #007bff;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
`;

const DataLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-top: 10px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
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
    width: 15%;
    margin: 10px 0;

    &:hover {
        background-color: #0056b3;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:44323/customer', formData);
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
