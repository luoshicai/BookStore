import React from "react";
import {BrowserRouter,Router,Route,Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import HomePage from "./view/HomePage";
import LogIn from "./view/logIn";
import BookPage from "./view/bookmore";
import Order from "./view/Order";
import BookDetail from "./view/BookDetail";
import Root from "./view/root";
import Cart from "./view/Cart";
import NewLogIn from "./view/NewLogIn";
export const history = createBrowserHistory();
export const BookMessage=[];
class BasicRouter extends React.Component{
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render() {
        return(
          <div key="myRouter">
              <BrowserRouter>
                  <Switch>
                      <Route key="HomePage" exact path="/" component={HomePage}/>
                      <Route key="LogIn" exact path="/LogIn" component={LogIn}/>
                      <Route key="BookPage" exact path="/More" component={BookPage}/>
                      <Route key="Order" exact path="/Order" component={Order}/>
                      <Route key="BookDetail" exact path="/BookDetail" component={BookDetail}/>
                      <Route key="submitOreder" exact path="/Order" component={Order}/>
                      <Route key="Root" exact path="/Root" component={Root}/>
                      <Route key="Cart" exact path="/Cart" component={Cart}/>
                      <Route key="NewLogIn" exact path="/NewLogIn" component={NewLogIn}/>
                  </Switch>
              </BrowserRouter>
          </div>
        );
    }
}

export default BasicRouter;
