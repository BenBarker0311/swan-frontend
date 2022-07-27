import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Strategies from './views/Strategies';
import Settings from './views/Settings';
import Support from './views/Support';
import History from './views/History';
import Dashboard from './views/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import web3 core

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div style={{ display: 'flex' }}>
          <Switch>
            <Route path="/strategies">
              <Strategies />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/support">
              <Support />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Redirect from="/*" to="/strategies" />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
