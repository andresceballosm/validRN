import {AppRegistry} from 'react-native';
import React, { Fragment } from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './src/store/store';

const ReduxApp = () => (
    <React.Fragment>
        <Provider store={Store}>  
            <App />
        </Provider>  
    </React.Fragment>
)    

AppRegistry.registerComponent(appName, () => ReduxApp);
