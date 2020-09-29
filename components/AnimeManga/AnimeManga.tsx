import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import ScrollContainer from '../ScrollContainer/ScrollContainer';
import { IAnime } from '../../interfaces/Anime';
import { Text } from 'native-base';
import Constants from 'expo-constants';

const AnimeManga = (props) => {
    const [data, setData] = useState<IAnime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { typeSerie, category } = props;

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        await axios({
            "method": "GET",
            "url": "https://kitsu.io/api/edge/" + typeSerie + '?filter[categories]=' + category.slug,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [typeSerie, category])

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, [fetchData]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "black" }}>
            {isLoading ? (
                <Text style={{ color: 'white' }}>Loading ...</Text>
            ) : (

                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "black" }}>
                        {data.length > 0 ? (
                            <View style={{ height: 250 }}>
                                <Text style={{ color: 'white', marginTop: 20, marginHorizontal: 20, }}>{category.name}</Text>
                                <SafeAreaView style={styles.container}>
                                    <ScrollContainer data={data} navigation={props.navigation} horizontalScroll={true} />
                                </SafeAreaView>
                            </View >
                        ) :
                            null

                        }
                    </View >
                )
            }
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row'
    }
});

export default AnimeManga
