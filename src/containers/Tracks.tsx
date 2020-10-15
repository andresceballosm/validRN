import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { RootState } from '../store/reducers/rootReducers';
import NetInfo from "@react-native-community/netinfo";
import { Button, Avatar, ListItem } from '@ui-kitten/components';
import { ITrack } from '../store/interfaces';
import { clearTracks, getTopTracks, setTopTracks } from '../store/actions/fmActions';
import { movies } from '../common/countries';
import { connect } from 'react-redux';
import { AutocompleteComponent } from '../components/Autocomplete';
import styles from './styles';
import { getDataObject } from '../store/common/AsyncStorage';

const mapStateToProps = (state: RootState) => ({
    tracks: state.fm.tracks,
});

const mapDispatchToProps = dispatch => ({
    getTopTracks: (data) => dispatch(getTopTracks(data)),
    setTopTracks: (data ) => dispatch(setTopTracks(data)),
    clearTracks: () => dispatch(clearTracks())
});

interface Props {
    getTopTracks: any;
    clearTracks: any;
    setTopTracks: any;
    tracks: ITrack[];
};

const Tracks = (props:Props) => {

    const [page, setPage] = useState(1);
    const [data, setData] = React.useState(movies);
    const [value, setValue] = React.useState(null);

    const setModoOffline = async() => {
        let tracksLocal = await getDataObject('tracks');
        props.setTopTracks(tracksLocal)
    };

    useEffect( () => {
        NetInfo.fetch().then(state => {
            if(!state.isConnected){
                setModoOffline()
            }
        });
    }, [])

    const LoadMoreData = () => {
        let newPage = (page + 1)
        setPage(newPage);
        LoadData(newPage)
    }

    const getData = () => {
        props.clearTracks();
        setPage(1)
        LoadData(1)
    }

    const LoadData = (newPage) => {
        props.getTopTracks({
            country : value,
            page: newPage.toString(),
            limit:'20'
        });
    };


    const renderCustomItem = (data:any) => (
        <ListItem
        title={data.item.name}
        description={data.item.artist.name}
        accessoryLeft={ () => {
            return (
                <Avatar
                source={{ uri : data.item.image[1]["#text"] }}
                />
            )
        }}
        />
    )
    

    const renderFooter = () => {
        return (
          //Footer View with Load More button
            <View style={styles.footer}>
                { props.tracks.length > 0 && (
                    <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={LoadMoreData}
                    style={styles.loadMoreBtn}>
                        <Text style={styles.btnText}>Load More</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const ItemSeparatorView = () => (
        <View
            style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
            }}
        />
    );

    return (
        <View style={{flex:1}}>
            <View style={styles.marginB}>
                <AutocompleteComponent 
                movies = {movies}
                value= {value}
                setValue = {setValue}
                data = {data} 
                setData = {setData} />
            </View>
            <View style={styles.marginB}>
                <Button 
                onPress={getData} 
                style={styles.btn} 
                appearance='outline' 
                status={ value !== '' ? 'primary' : 'basic' }>
                    Buscar
                </Button>
            </View>
            <View style={styles.list}>
                <FlatList
                data={props.tracks}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => LoadMoreData}
                onEndReachedThreshold ={0.9}
                ListFooterComponent={renderFooter}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={renderCustomItem}
                />
            </View>
        </View>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);