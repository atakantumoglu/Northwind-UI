import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.thead`
    background-color: #f7f7f7;
`;

const TableRow = styled.tr`
    &:hover {
        background-color: #f5f5f5;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
`;

const TableHeadCell = styled.th`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
`;

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://localhost:44323/customer');
                setCustomers(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error while connecting to API!", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeadCell>Company Name</TableHeadCell>
                        <TableHeadCell>Contact Name</TableHeadCell>
                        <TableHeadCell>Address</TableHeadCell>
                        <TableHeadCell>City</TableHeadCell>
                        <TableHeadCell>Country</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        {/* Diğer başlık hücrelerini burada ekleyin */}
                    </TableRow>
                </TableHeader>
                <tbody>
                    {customers.map(customer => (
                        <TableRow key={customer.id}>
                            <TableCell><Link to={`/customer/${customer.id}`}>{customer.companyName}</Link></TableCell>
                            <TableCell>{customer.contactName}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>{customer.city}</TableCell>
                            <TableCell>{customer.country}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomerList;
