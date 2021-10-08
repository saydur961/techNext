import { createTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import zIndex from '@material-ui/core/styles/zIndex';

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    light: Palette['primary'];
  }
  interface PaletteOptions {
    light: PaletteOptions['primary'];
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#E65100'
    },
    secondary: {
      // main: '#89c99b',
      main: '#7dd56e'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    light: {
      main: '#f0f0f0',
      dark: '#bebebe'
    }
    
  },

  zIndex: {
    appBar: zIndex.drawer + 1,
    modal: zIndex.drawer + 2
  },

  typography: {
    button: {
      fontSize: '1rem',
      fontWeight: 500
    },
    
  },

  overrides: {
    MuiTableCell: {
      head: {
        fontSize: '1.3rem'
      },
      body: {
        fontSize: '1.2rem'
      }
    }
  }


});

export default theme;