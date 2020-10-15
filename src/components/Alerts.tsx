import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { hideAlert } from '../store/actions/appActions';
import { Modal, Card, Text, Button } from '@ui-kitten/components';
import { RootState } from '../store/reducers/rootReducers';

const mapStateToProps = (state: RootState) => ({
    alert: state.app.alert,
  });
  
  const mapDispatchToProps = dispatch => ({
    closeAlertAction: () => dispatch(hideAlert()),
  });
  
  type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
  

  const ShowAlert: React.FC<Props> = props => {
    const [visible, setVisible] = useState<boolean>(true);
    const closeAlert = () => {
        setVisible(false);
        props.closeAlertAction()
    }

    return (
        <Modal
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => closeAlert()}>
            <Card disabled={true}>
                <View style={{marginBottom:10}}>
                    <View style={{marginBottom:10}}>
                        <Text category='h5' style={{color:'black', fontWeight:'bold'}}>{props.alert.type === 'error' ? 'Oops!' : 'Info'}</Text>
                    </View>
                    <Text>{props.alert.msg}</Text>
                </View>
                <Button 
                status={props.alert.type === 'error' ? 'basic' : 'primary'}
                onPress={() => closeAlert()}>
                    DISMISS
                </Button>
            </Card>
        </Modal>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAlert);