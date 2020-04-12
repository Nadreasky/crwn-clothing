import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import './App.css';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoudary from './components/error-boundary/error-boundary.component';

import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
// import AuthenticationPage from './pages/authentication/authentication.component';
// import CheckoutPage from './pages/checkout/checkout.component';
import { GlobalStyle } from './global.styles';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const AuthenticationPage = lazy(() => import('./pages/authentication/authentication.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoudary>
          <Route exact path='/' component={HomePage} />
          <Suspense fallback={<Spinner />}>
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<AuthenticationPage />)} />
          </Suspense>
        </ErrorBoudary>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
