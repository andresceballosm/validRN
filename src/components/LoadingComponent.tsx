import React from 'react';
import { View } from 'react-native';
import { Modal, Spinner, Text } from '@ui-kitten/components';

export const LoadingComponent = () => (
    <Modal
    visible={true}
    backdropStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    }}>
        <View style={{
            borderRadius: 4,
            alignItems:'center',
            justifyContent:'space-between',
            padding: 30,
            backgroundColor: 'white',
        }}>
            <Spinner size='medium' />
            <Text>Loading...</Text>
        </View>
    </Modal>
);