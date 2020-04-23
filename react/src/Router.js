import React from "react";
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import LoadingPage from "./LoadingPage"
import ErrorPage from "./ErrorPage"
import { Suspense } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer.js';
import ChatBox from './components/ChatBox';
import { createHashHistory } from "history";;

const  LoadableHomePage = React.lazy(() => import('./HomePage'));
const LoadableProfilePage = React.lazy(() => import('./ProfilePage'));
const LoadableOrderPage = React.lazy(() => import('./OrderListPage'));
const LoadableUpdateMenuPage = React.lazy(() => import('./UpdateMenuPage'));
const LoadableMatchOrderPage = React.lazy(() => import('./MatchOrderPage'));
const LoadableFindRecordPage = React.lazy(() => import('./FindRecordPage'));
const LoadableRestSearchPage = React.lazy(() => import('./LoadingPage'));
const LoadableRestaurantPage = React.lazy(() => import('./RestaurantPage'));
const LoadableCoorperatePage = React.lazy(() => import('./CoorperatePage'));
const LoadablePaymentPage = React.lazy(() => import('./PaymentPage'));

class Routes extends React.Component {

  render() {
    return (
      // Hash router is used because of github-pages issues with browser router
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Suspense fallback={<LoadingPage />}>
              <LoadableHomePage />
            </Suspense>
          </Route>
          <Route exact path="/profile">
            <Suspense fallback={<LoadingPage />}>
              <LoadableProfilePage />
            </Suspense>
          </Route>
          <Route exact path="/find_record">
            <Suspense fallback={<LoadingPage />}>
              <LoadableFindRecordPage />
            </Suspense>
          </Route>
          <Route exact path="/order">
            <Suspense fallback={<LoadingPage />}>
              <LoadableOrderPage />
            </Suspense>
          </Route>
          <Route exact path="/update_menu">
            <Suspense fallback={<LoadingPage />}>
              <LoadableUpdateMenuPage />
            </Suspense>
          </Route>
          <Route exact path="/restaurants">
            <Suspense fallback={<LoadingPage />}>
              <LoadableRestSearchPage />
            </Suspense>
          </Route>
          <Route exact path="/match_order">
            <Suspense fallback={<LoadingPage />}>
              <LoadableMatchOrderPage />
            </Suspense>
          </Route>
          <Route exact path="/restaurants/:restName">
            <Suspense fallback={<LoadingPage />}>
              <LoadableRestaurantPage />
            </Suspense>
          </Route>
          <Route exact path="/payment/:orderid">
            <Suspense fallback={<LoadingPage />}>
              <LoadablePaymentPage />
            </Suspense>
          </Route>
          <Route exact path="/coorperate">
            <Suspense fallback={<LoadingPage />}>
              <LoadableCoorperatePage />
            </Suspense>
          </Route>
          <Route path="/loading" component={LoadingPage} />
          <Route path="/*"  component={ErrorPage} />
        </Switch>
        <ChatBox />
        <Footer />
      </Router>
    )
  };
}
export default Routes;