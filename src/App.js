import React, { Component } from 'react';

// Import CCS
import './App.css';
import './css/material-icons.css';

//Components
import './toolbox/theme.css';
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Layout from 'react-toolbox/lib/layout/Layout';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider'
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Panel from 'react-toolbox/lib/layout/Panel';
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar';

//Redux
import { connect } from 'react-redux';
import { Actions } from './redux/actions.js';
import { store} from './redux/store.js';

//Preload screens
import constants  from './constants.js';
let screens = constants.screens;
let ScreensObj = {};
screens.forEach(function(screen){
  ScreensObj[screen.component] = require("./"+screen.component+".js");
});

class App extends Component {
   state = {
        drawerActive: false,
        drawerPinned: false,
        sidebarPinned: false
    };

    componentWillMount = () => {

    };

    openDrawer = () => {
      Actions.nav.drawerOpen();
    };
    closeDrawer = () => {
      Actions.nav.drawerClose();
    };

    screenContainer = () => {
      let scr = React.createElement(ScreensObj[this.props.screen].default);

      return scr;
    };

    loadScreen = (screen, params) => {
      Actions.nav.screenLoad(screen, params);
      Actions.nav.drawerClose();
    };

    openLoader = () => {
      Actions.nav.loaderOpen();
    };
    closeLoader = () => {
      Actions.nav.loaderClose();
    };

    //MENU FUNCTIONS
    showStore = () => {
      console.log(store.getState());
    };
    menuIcon = () => {
      let par = store.getState().navState.params;
      let user = store.getState().userState;
      let icon = 'menu';
      let action = this.openDrawer;
      if(par.back){ 
        icon = 'arrow_back';
        action = this.screenBack;
      } else if (!user.token) {
        return {icon: null, action:null }
      }
      return {icon: icon, action:action }
    };

    clientRequest = (t) => {
      Actions.clientRequest.list.tab(t);
      Actions.nav.screenLoad('ClientRequestList');
      Actions.nav.drawerClose();
    };

    providerResponses = (t) => {
      Actions.providerResponse.list.tab(t);
      Actions.nav.screenLoad('ProviderResponseList');
      Actions.nav.drawerClose();
    };



    screenBack = () => {
      Actions.nav.screenBack();
    };

    getTitle = () => {
      let s = store.getState().navState;
      if(s.params.title) {
        return s.params.title; 
      } else {
        return "Refaxiona";
      }
    };

  render() {
    return (

        <ThemeProvider theme={theme}>
         <Layout>
            {/*=============DRAWER*/}
            <NavDrawer active={this.props.drawer}
                permanentAt='xxxl'
                onOverlayClick={ this.closeDrawer }>
                <div style={{display: 'flex', justifyContent: 'center'}}>                    
                  <h3>Menu</h3>
                </div>
                <MenuItem value='Main' icon='settings' 
                caption='Main' onClick={ this.loadScreen.bind(null,'Main', null) }/>
                <MenuItem value='logout' icon='exit_to_app' 
                caption='Cerrar sesión' onClick={ Actions.user.logout } />
            </NavDrawer>

            {/*=============DIALOG FOR LOADING*/}
            <Dialog
              active={this.props.loader}
              title='Loading'
            >
              <div style={{display: 'flex', justifyContent: 'center'}}>                    
                <br></br>
                <ProgressBar type="circular" mode="indeterminate" />
              </div>                  
            </Dialog>

            {/*=============DIALOG FOR ACTIONS*/}
            <Dialog
              active={this.props.dialog.status}
              actions={this.props.dialog.buttons}
              title={this.props.dialog.title}
            >
              <p>{this.props.dialog.message}</p>               
            </Dialog>


            {/*=============APP CONTAINER*/}
            <Panel >
                <AppBar 
                title={this.getTitle()} 
                leftIcon={this.menuIcon().icon} 
                onLeftIconClick={ this.menuIcon().action } 
                rightIcon='book' onRightIconClick={ this.showStore } 
               
                >
                  {/*
                   rightIcon='help' onRightIconClick={  this.loadScreen.bind(null,'Help', {back: true}) } 
                  rightIcon='book' onRightIconClick={ this.showStore }

                */}
                 </AppBar>

                <div style={{ 
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.8rem'}}>
                    {this.screenContainer()}
                    {/*rightIcon='book' onRightIconClick={ this.showStore }*/}
                </div>
            </Panel>



        </Layout>
        </ThemeProvider>

    );
  }
}


const mapStateToProps = function(store) {
  return {
    drawer: store.navState.drawer,
    loader: store.navState.loader,
    screen: store.navState.screen,
    dialog: store.navState.dialog
  };
}

export default connect(mapStateToProps)(App);

