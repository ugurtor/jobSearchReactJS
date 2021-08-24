import React from "react";

import {Route, Switch} from "react-router-dom"
import Layout from './components/layout/Layout';
import DescriptionPage from "./pages/Description";
import MainPage from "./pages/MainPage";
function App() {
  return (    
    <Layout>
      <Switch>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        <Route path="/description">
          <DescriptionPage/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;