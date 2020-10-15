import React, { useState, useEffect } from 'react';
import { 
    View, 
    FlatList, 
    Alert,
    Text,
    TouchableOpacity } from 'react-native';
import { RootState } from '../store/reducers/rootReducers';
import NetInfo from "@react-native-community/netinfo";
import { Button, Avatar, ListItem } from '@ui-kitten/components';
import { IArtist } from '../store/interfaces';
import { clearArtists, getTopArtists, setTopArtists } from '../store/actions/fmActions';
import { movies } from '../common/countries';
import { connect } from 'react-redux';
import { AutocompleteComponent } from '../components/Autocomplete';
import styles from './styles';
import { getDataObject } from '../store/common/AsyncStorage';

const mapStateToProps = (state: RootState) => ({
    artists: state.fm.artists,
});

const mapDispatchToProps = dispatch => ({
    getTopArtists: (data) => dispatch(getTopArtists(data)),
    setTopArtists: (data ) => dispatch(setTopArtists(data)),
    clearArtists: () => dispatch(clearArtists())
});

interface Props {
    getTopArtists: any;
    clearArtists: any;
    setTopArtists: any;
    artists: IArtist[];
};

const Artists = (props:Props) => {

    const [page, setPage] = useState(1);
    const [data, setData] = React.useState(movies);
    const [value, setValue] = React.useState(null);

    const setModoOffline = async() => {
        popUpConnection()
        let artistsLocal = await getDataObject('artists');
        props.setTopArtists(artistsLocal)
    }


    const popUpConnection = () => {
        Alert.alert(
        'info',
        'You don´t have an internet connection.',
        [   
            { text:  'OK', onPress: () => {
                console.log('')
            }},
        ],
        { cancelable: false },
        );
    }

    useEffect( () => {
        NetInfo.fetch().then(state => {
            if(!state.isConnected){
                setModoOffline()
            }
        });
    }, [])

    const LoadMoreData = () => {
        let newPage = (page + 1)
        setPage(page + 1);
        LoadData(newPage)
    }

    const getData = () => {
        props.clearArtists();
        setPage(1)
        LoadData(1)
    }

    const LoadData = (newPage) => {
        props.getTopArtists({
            country : value,
            page: newPage.toString(),
            limit:'20'
        });
    };


    const renderCustomItem = (data:any) => (
        <ListItem
        title={data.item.name}
        description={data.item.url}
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
                { props.artists.length > 0 && (
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
                data={props.artists}
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

export default connect(mapStateToProps, mapDispatchToProps)(Artists);