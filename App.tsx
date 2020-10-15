import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { RootState } from './src/store/reducers/rootReducers';
import { LoadingComponent } from './src/components/LoadingComponent'
import ShowAlert from './src/components/Alerts';
import Artists from './src/containers/Artists';
import Tracks from './src/containers/Tracks';


const mapStateToProps = (state: RootState) => ({
  loading: state.app.loading,
  alert: state.app.alert
});

interface Props {
  loading: boolean;
  alert: any;
}

const App = (props:Props) => {
  const { loading, alert } = props;
  const [route, setRoute] = useState(1);

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={{flex: 1, margin:10}}>
        { loading && (
          <LoadingComponent />
        )}
        { alert && (
          <ShowAlert />
        )}
        <View style={{flex:1}}>
          <View style={styles.tab}>
            <Button 
            onPress={() => setRoute(1)} 
            style={styles.btn} 
            appearance='outline' 
            status={ route === 1 ? 'primary' : 'basic' }>
              ARTISTS
            </Button>
            <Button 
            onPress={() => setRoute(2)} 
            style={styles.btn} 
            appearance='outline'  
            status={ route !== 1 ? 'primary' : 'basic' }>
              TRACKS
            </Button>
          </View>
          <View style={{flex:10}}>
            { route === 1 ?
              <Artists />
              :
              <Tracks />
            }
          </View>
        </View>
      </Layout>
    </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex:1,
    flexDirection: 'row',
    marginBottom:20
  },
  btn:{
    flex:1
  },
  marginB: {
    marginBottom:10
  }
});

export default connect(mapStateToProps)(App);