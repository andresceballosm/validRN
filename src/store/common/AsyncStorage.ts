import AsyncStorage from '@react-native-community/async-storage';

export const getDataString = async (key) => {
    try {
        const value = AsyncStorage.getItem(key).then(v => v)
        if(value !== null) {
            return value
        }
    } catch(e) {
        return null;
    }
}

export const storeDataString = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}


export const removeData  = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
    // saving error
    }
}

export const storeDataObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem( key, jsonValue)
    } catch (e) {
      // saving error
    }
}


export const getDataObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        console.log('jsonValue', jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}