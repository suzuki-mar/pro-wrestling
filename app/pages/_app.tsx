import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz';
import { ErrorBoundary } from 'react-error-boundary';
import LoginForm from 'app/auth/components/LoginForm';
import { Suspense } from 'react';

import 'app/core/styles/index.css';
import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-amber.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-tabs/style/react-tabs.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';

//You can customize this as you want and even move it out to a separate file
const theme = createTheme({
  palette: {
    type: 'light',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback="Loading...">
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={useQueryErrorResetBoundary().reset}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    );
  }
}
