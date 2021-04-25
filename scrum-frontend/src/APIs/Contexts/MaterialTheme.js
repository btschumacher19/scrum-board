import { createMuiTheme } from '@material-ui/core/styles';
import {  } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';


const theme = createMuiTheme({
    palette: {
        type: 'dark',
    primary: {
        main: '#4b5d67',
        dark: '#648dae'
    },
    secondary: {
        main: '#59405c',
        dark: '#aa647b'
    },
    error: {
        main: '#f44336',
        dark: '#aa647b'
    },
    warning: {
        main: '#ffb74d',
        dark: '#f57c00'
    }
},
  });

export default theme