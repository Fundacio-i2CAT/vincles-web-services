import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import React, {Component, Fragment, Suspense} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import ScrollToTop from './components/Common/ScrollToTop';
import {intents} from './components/Intents';
import {API_URL, ENVIRONMENT, REPORT_BUG_URL} from "./config";
import WizardPage from './pages/Wizard';
import ReportBugPage from './reportBug/ReportBugPage';
import {getCodeVersion, getReleaseDate} from "./shared/getCodeVersion";
import isDevelopment from './shared/isDevelopment';
import configureStore from './Store';
import theme from './styles/theme.js';

if (isDevelopment) {
  console.log('Environment: ' + ENVIRONMENT);
}
console.log(`Code version: ${getCodeVersion()} Release Date: ${getReleaseDate()}`);
console.log('API: ', API_URL);
console.log('Simulation Report API: ', REPORT_BUG_URL);

const preloadedState = window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

class App extends Component {
  render() {
    return (
      <Suspense fallback="">
        <MuiThemeProvider theme={theme}>
          <link rel="stylesheet" type="text/css" href={'/styles/main.css'} />
          <div>
            <CssBaseline/>
            <Provider store={store}>
              <HashRouter>
                <ScrollToTop>
                  <Switch>
                    <Route exact={true} path='/' component={WizardPage}/>
                    <Route path='/admin' component={WizardPage}/>
                    {isDevelopment &&
                    <Fragment>
                      <Route path='/reportBug' component={ReportBugPage}/>
                      <Route path='/intents' component={intents(WizardPage)}/>
                    </Fragment>
                    }
                  </Switch>
                </ScrollToTop>
              </HashRouter>
            </Provider>
          </div>
        </MuiThemeProvider>
      </Suspense>
    );
  }
}

export default App;
