import './App.css';
import DrawerAppBar from './components/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CollectProfiles from './pages/dashboard/collectProfiles';

function App() {
  return (
      <Router>
        <DrawerAppBar>
          <Switch>
            <Route exact path='/' component={CollectProfiles} />
          </Switch>
        </DrawerAppBar>
      </Router>
  );
}

export default App;
