import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { TrackPage } from "./pages/TrackPage";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Player />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/track/:id" component={TrackPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
