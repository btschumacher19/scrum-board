import React, { useState, useEffect } from 'react';
import './App.css'
import Login from './components/login';
import Home from './components/Home';
import BoardDetailPage from './components/pages/BoardDetailPage';
import BoardsList from './components/pages/BoardsList';
import NewTask from './components/pages/Tasks/NewTask';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { getLoggedInUser } from './APIs/UserAPI';
import { Paper , Switch} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './APIs/Contexts/MaterialTheme';
import CalendarPage from './components/pages/Calendar/CalendarPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [ didRender, setDidRender ] =useState(false)
  const [ darkMode, setDarkMode ] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      console.log("running....")
      if (localStorage.getItem("access_token") !== 'null') {
        
        let response = await getLoggedInUser(localStorage.getItem("access_token"));
        let data = await response.json();
    
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
          setDidRender(true)
        }
      }
    }
    getUser()
  },[])

  const renderLogin =()=> {
    return (
      <Login 
      isLoggedIn={isLoggedIn}
      user={user}
      />
    )
  }

  const renderHome =()=> {
    return (
      <Home
      isLoggedIn={isLoggedIn}
      user={user}
    />
    )
  }

  const GuardedRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
      isLoggedIn === true
            ? <Component {...props} />
            : didRender ? <Redirect to='/' /> : undefined
    )} />
)

  return (
    <ThemeProvider theme={ theme }>
      <Switch checked={ darkMode } onChange={()=> setDarkMode(!darkMode) }/>
      <Router>
        <Paper style={{height: '100vh', width: '100%'}}>
        <Route exact path="/login" render={ renderLogin }/>
        <Route exact path="/" render={ renderHome } />
        <Route exact path="/test" render={CalendarPage } />
        <GuardedRoute exact path="/board" component={ BoardsList }  />
        <GuardedRoute exact path="/board/:boardID" component={ BoardDetailPage } />
        <GuardedRoute exact path="/board/:boardID/:columnID/task/new" component={ NewTask } />
        </Paper>
      </Router>
      </ThemeProvider>
  );
}

export default App;
