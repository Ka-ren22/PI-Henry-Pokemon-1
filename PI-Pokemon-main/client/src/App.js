import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from "./Components/LandingPage/LandingPage"
import Home from './Components/Home/Home';
import Form from './Components/Form/Form';
import Detail from './Components/Detail/Detail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/pokemons" component={Form}/>
          <Route exact path="/home/:id" component={Detail}/>
          <Route path="*" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
