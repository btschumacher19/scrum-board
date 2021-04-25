import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import StyledButton from '../components/styledComponents/Button';
import SaveIcon from '@material-ui/icons/Save';
import StyledLink from './styledComponents/Link';
import { Outer, Wrapper } from './styledComponents/CenteredPage';
import DashboardIcon from '@material-ui/icons/Dashboard';



const Home = (props) => {
    const { isLoggedIn, user } = props;

        return (
          <Outer>
            
            <Wrapper>
            <h1>Welcome to my Kanban Board!</h1>
            {
              user.username  ?
              <>
                <h3>Hi {user.username}</h3>
              <StyledLink to={"/board"}><StyledButton variant="contained" color="primary" endIcon={ <DashboardIcon /> }> View Your Boards</StyledButton></StyledLink>
             </>
              :
              <h4>It looks like you aren't yet signed in.</h4>
            }
             
            {
              !isLoggedIn
              ?
              <>
                
                <div>
                  <StyledLink to='/login'>
                    <StyledButton variant="contained" color="primary">
                      Login
                    </StyledButton>
                    </StyledLink>
                </div>
                <StyledButton variant="outlined" color="secondary">
                  <StyledLink to='/signup'>Signup</StyledLink>
                </StyledButton>
              </ >
              :
              <StyledButton variant="text" color="secondary" onClick={console.log('logout')}>Logout</StyledButton>
            }
            </Wrapper>
          </Outer>
        );
      };
      
export default withRouter(Home);