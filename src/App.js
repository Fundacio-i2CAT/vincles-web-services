import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from './components/Common/ScrollToTop';
import {dev} from './components/Dev';
import CorporateHeader from './components/Header/CorporateHeader';
import {API_URL, ENVIRONMENT, REPORT_BUG_URL} from "./config";
import HabitatgeEspecialUrgenciaDesnonaments from "./pages/HabitatgeEspecialUrgenciaDesnonaments";
import HabitatgeEspecialUrgenciaPagamentHipoteca from "./pages/HabitatgeEspecialUrgenciaPagamentHipoteca";
import InfoEspecialUrgenciaPagamentLloguer from "./pages/HabitatgeEspecialUrgenciaPagamentLloguer";
import HabitatgeMIFO from "./pages/HabitatgeMIFO";

import IndexPage from './pages/IndexPage';
import InfoFonsInfancia from './pages/InfoFonsInfancia';
import InfoMenjador from './pages/InfoMenjador';
import InfoRAI from './pages/InfoRAI';
import InfoRGC from './pages/InfoRGC';
import InfoLloguerMediacio from "./pages/lloguerMediacio";
import WizardPage from './pages/Wizard';
import ReportBugPage from './reportBug/ReportBugPage';
import {getCodeVersion, getReleaseDate} from "./shared/getCodeVersion";
import isDevelopment from './shared/isDevelopment';
import configureStore from './Store';
import './styles/main.css';
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
        <MuiThemeProvider theme={theme}>
          <div>
            <CorporateHeader/>
            <CssBaseline/>
            <Provider store={store}>
              <BrowserRouter>
                <Switch>
                  <ScrollToTop>
                    <Route exact={true} path='/' component={IndexPage}/>
                    <Route path='/wizard' component={WizardPage}/>
                    <Route path='/reportBug' component={ReportBugPage}/>
                    <Route path='/ajuts/rai' component={InfoRAI}/>
                    <Route path='/ajuts/rgc' component={InfoRGC}/>
                    <Route path='/ajuts/lloguer_mediacio' component={InfoLloguerMediacio}/>
                    <Route path='/ajuts/lloguer_especial_urgencia' component={InfoEspecialUrgenciaPagamentLloguer}/>
                    <Route path='/ajuts/hipoteca_especial_urgencia'
                           component={HabitatgeEspecialUrgenciaPagamentHipoteca}/>
                    <Route path='/ajuts/desnonament_especial_urgencia'
                           component={HabitatgeEspecialUrgenciaDesnonaments}/>
                    <Route path='/ajuts/mifo' component={HabitatgeMIFO}/>
                    <Route path='/ajuts/menjador' component={InfoMenjador}/>
                    <Route path='/ajuts/fons_infancia' component={InfoFonsInfancia}/>
                    {isDevelopment &&
                    <Route path='/wizard_dev' component={dev(WizardPage)}/>
                    }
                  </ScrollToTop>
                </Switch>
              </BrowserRouter>
            </Provider>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
