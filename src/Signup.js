import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #2D142C;
`;

const SignupForm = styled.form`
    background-color: #510A32;
    padding: 40px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
    color: #EE4540;
    margin-bottom: 20px;
    text-align: center;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    background-color: #801336;
    color: white;
    font-size: 16px;
`;

const Button = styled.button`
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #C72C41;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;


    &:hover {
        background-color: #EE4540;
    }
`;

const Logo = styled.img`
    width: 100px;
    display: block;
    margin: 0 auto 30px auto;
`;

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:44323/api/user", {
                email,
                password,
            });

            if (response.data.isSuccessful) {
                navigate("/user/login"); // Kullanıcı başarıyla giriş yaptığında müşteri listesine yönlendir.
            } else {
                alert("Signup failed.");
            }
        } catch (error) {
            alert("An error occurred while trying to sign up.");
        }
    };

    return (
        <Container>
            <SignupForm onSubmit={handleSubmit}>
                <Logo src="/northwindtraderslogo.jpg" alt="Northwind Traders" />
                <Title>Signup</Title>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Sign Up</Button>
            </SignupForm>
        </Container>
    );
}

export default Signup;
