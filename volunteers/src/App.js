import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './context/auth-context';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (userId) {
    routes = (
      <Switch>
        <Route
          path="/volunteer" exact>
                    <Volunteer />
        </Route>
        <Route
          path="/monitoring" exact>
                    <Monitoring />
        </Route>                
      </Switch>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
