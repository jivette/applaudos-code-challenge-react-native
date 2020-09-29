import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import ScrollContainer from '../ScrollContainer/ScrollContainer';
import { IAnime } from '../../interfaces/Anime';
import { Text } from 'native-base';
import Constants from 'expo-constants';


const Search = (props) => {
    const { search, navigation, typeSerie } = props;
    const [data, setData] = useState<IAnime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        await axios({
            "method": "GET",
            "url": "https://kitsu.io/api/edge/" + typeSerie + "?filter[text]=" + search,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setData(response.data.data)
                if (!response.data.data.length) {
                    setMsg("Not Found");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [search, typeSerie])

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, [fetchData]);

    return (

        <View style={{ flex: 1 }}>
            {
                isLoading ?
                    <Text style={{ color: 'white' }}>Loading ...</Text>
                    :
                    <View style={{ flex: 1 }}>
                        {
                            msg ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white' }}>{msg}</Text>
                                </View >
                                :

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'orange', fontSize: 20, marginHorizontal: 30, }}>Result by "{typeSerie}", "{search}": </Text>
                                    <SafeAreaView style={styles.container}>
                                        <ScrollContainer data={data} navigation={navigation} horizontalScroll={false} />
                                    </SafeAreaView>
                                </View >
                        }
                    </View >
            }
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row'
    }
});
export default Search
