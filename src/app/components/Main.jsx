import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { Router, Route } from 'react-router-dom';
import { history} from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectTaskDetail } from './TaskDetail';
import { Redirect } from 'react-router-dom';
import {ConnectedLogin} from './Login'


const RouteGuard = Component =>({match})=>
    !store.getState().session.authenticated ?
        <Redirect to="/"/> :
        <Component match={match}/>;


export const Main = () => (
    <Router history={history}>
    <Provider store={store}>
            <div>
            <ConnectedNavigation/>
                <Route exact path="/" component={ConnectedLogin}/>
                <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
                <Route exact path="/task/:id" render={RouteGuard(ConnectTaskDetail)}/>
            </div>
    </Provider>
    </Router>
)