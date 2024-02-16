import AppLoading from '@components/AppLoading.tsx';
import MuiLocalizationLayout from '@components/layouts/MuiLocalizationLayout.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import i18n from './plugins/i18n.ts'; // Import your i18n instance
import store from './store/store.ts';
import './styles/global.scss';
import { CssBaseline } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import {
  SuccessButtonGradient,
  gradientBackGround,
} from './styles/globalMuiStyls.ts';

export const queryClient = new QueryClient();

// import App from './App.tsx';
const App = React.lazy(() => import('./App.tsx'));

export const lightTheme = createTheme({
  direction: 'ltr',
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundImage: SuccessButtonGradient,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#e30513',
      light: '#FFEDE4',
    },
    error: {
      main: '#FF0000',
    },
    secondary: {
      main: '#EB3349',
    },
  },
});

export const darkTheme = createTheme({
  direction: 'ltr',
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#333',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#333',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundImage: SuccessButtonGradient,
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    error: {
      main: '#FF0000',
    },
    primary: {
      main: '#e30513',
      light: '#FFEDE4',
    },
    secondary: {
      main: '#EB3349',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MuiLocalizationLayout>
      <React.Suspense fallback={<AppLoading />}>
        {/* <GoogleOAuthProvider clientId={GOOGLE_API.clientId}> */}
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </Provider>
        </I18nextProvider>
        {/* </GoogleOAuthProvider> */}
      </React.Suspense>
    </MuiLocalizationLayout>
  </BrowserRouter>
);
