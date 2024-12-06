import { FC } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './presentation/theme';
import { EstimationPage } from './presentation/pages/EstimationPage';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EstimationPage />
    </ThemeProvider>
  );
};

export default App;