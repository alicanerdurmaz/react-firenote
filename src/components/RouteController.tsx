import React, { useState, Fragment } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import '../styles/animations/PageAnimation.css';

import NewNote from './NewNote/NewNote';
import MainPage from './MainPage';
import Login from './Login';
import * as ROUTES from '../helpers/PageList';
import PrivateRoute from './PrivateRoute';

const RouteController = () => {
  let location = useLocation();

  return (
    <Fragment>
      <TransitionGroup className='transition-group'>
        <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }} classNames='page'>
          <RouteSection>
            <Switch location={location}>
              <PrivateRoute exact path={ROUTES.MAIN} component={MainPage} />
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route>
                <div>404</div>
              </Route>
            </Switch>
          </RouteSection>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

const RouteSection = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
export default RouteController;
