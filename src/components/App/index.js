import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App({ children }) {
  return (
    <MuiThemeProvider>
      <div>{children}</div>
    </MuiThemeProvider>
  );
}

export default App;
