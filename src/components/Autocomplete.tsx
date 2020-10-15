import React from 'react';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

const filter = (item : any, query : any) => item.title.toLowerCase().includes(query.toLowerCase());

export const AutocompleteComponent = (props:any) => {

    const onSelect = (index : number) => {
        props.setValue(props.data[index].title);
    };

    const onChangeText = (query : any) => {
        props.setValue(query);
        props.setData(props.movies.filter(item => filter(item, query)));
    };

    const renderOption = (item : any, index : number) => (
        <AutocompleteItem
        key={index}
        title={item.title}
        />
    );

    return (
        <Autocomplete
            placeholder='Search by country'
            value={props.value}
            onChangeText={onChangeText}
            onSelect={onSelect}>
            { props.data.map(renderOption) }
        </Autocomplete>
    );
};
