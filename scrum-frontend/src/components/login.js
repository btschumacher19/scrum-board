import React, { useState } from 'react';
import axiosInstance from '../axios/loginAPI';
import GoogleLogin from 'react-google-login';
import GLogin from '../axios/gLogin';
import { withRouter } from 'react-router-dom';
import { Outer, Wrapper } from './styledComponents/CenteredPage';
import { Input, InputLabel } from '@material-ui/core';
import StyledButton from './styledComponents/Button';
import  { StyledInput } from './styledComponents/Input'


function Login( props ) {
    const { isLoggedIn, user, helper  } = props
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
		e.preventDefault();
        axiosInstance
        .post('auth/token/', {
            grant_type: 'password',
            username: username,
            password: password,
            client_id: '2AJ90N2RdZYrg51EWrES7OVvd6KgnaQB5WjyX2jS',
            client_secret:
                'Eeuxe5L0KFICc9WywErc1muEoFP6QYdrHrcYQprqXzCkPnwbSYHBYgmwZEJHnuM65yEG6iI23VkPSahvDlxGUmifgi1eCzaV891Cj3eYKwBzb7x4r9isCu06ZYahbN80',
        })
        //if 400, bad info, else
        .then((res) => {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
        }).then(() => {
            props.history.push('/');
            window.location.reload();
        });
	};

    const responseGoogle = (response) => {
        console.log(response);
        GLogin(response.accessToken);
      }

    return (
        <Outer>
            <Wrapper >
                <h1> Login </h1>
            <form onSubmit={ handleSubmit }>
            <InputLabel htmlFor="username" > Username </InputLabel>
            
            <StyledInput type="text" id="username" name="username" variant="containted" value={username} onChange={(e) => setUsername(e.target.value)} color="primary" />
            
            <InputLabel htmlFor="password" > Password </InputLabel>
            <StyledInput type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} color="secondary" />
            
            <StyledButton type="submit" color="primary" variant="contained"> Log In </StyledButton>
            </form>
            <br />
            <GoogleLogin
                clientId="79840845921-ql46qasi3iqca93g6ac1ipm4pehk3oi0.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={ responseGoogle }
                onFailure={ responseGoogle }
                />
            </Wrapper>
        </Outer>
    )
}

export default withRouter(Login);