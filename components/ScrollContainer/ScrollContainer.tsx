import React from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import SerieItem from '../SerieItem/SerieItem';
import { IAnimeDetail } from '../../interfaces/Anime';

const ScrollContainer = (props: any) => {
    const { data, horizontalScroll } = props;
    return (

        <ScrollView style={styles.scrollView} horizontal={horizontalScroll}>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: horizontalScroll ? 'nowrap' : 'wrap' }}>
                {
                    data.map((item: IAnimeDetail, index: number) => (
                        <SerieItem key={index} item={item} navigation={props.navigation} />
                    ))
                }
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20
    },
    text: {
        fontSize: 42,
    },
});


export default ScrollContainer
