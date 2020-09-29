import React from 'react';
import {
    TouchableHighlight, Linking, Image, View,
    Button, ScrollView, StyleSheet, SafeAreaView, Share
} from 'react-native';
import Constants from 'expo-constants';
import BuilderAttr from "../../components/BuilderAttr/BuilderAttr";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


export const SerieScreen = ({ navigation, route }) => {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: data.attributes.canonicalTitle + ': ' + data.attributes.description,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black', flexDirection: "row" }}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                        <View style={{ flex: 2 }}>
                            {
                                data.attributes.posterImage ?
                                    <Image source={{ uri: data.attributes.posterImage.large }} style={{ width: 150, height: 220 }} />
                                    :
                                    <Image source={{ uri: 'https://www.ultraboardgames.com/uno/gfx/powergrab2_.jpg' }}
                                        style={{ width: 150, height: 220 }} />
                            }

                        </View>
                        <View style={{ flex: 2 }}>
                            <BuilderAttr label="Main title" val={data.attributes.canonicalTitle} />
                            <BuilderAttr label="Canonical title" val={data.attributes.canonicalTitle} />
                            <BuilderAttr label="Type" val={data.type + ', ' + data.attributes.episodeCount + ' episodes'} />
                            <BuilderAttr label="Year" val={data.attributes.startDate + ' to ' + data.attributes.endDate} />
                        </View>
                    </View>

                    <BuilderAttr label="Genres" val={data.attributes.averageRating} />
                    <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
                        <View style={{ flex: 2 }}>
                            <BuilderAttr label="Average Rating" val={data.attributes.averageRating} />
                            <BuilderAttr label="Episode Duration" val={data.attributes.totalLength} />
                        </View>
                        <View style={{ flex: 2 }}>
                            <BuilderAttr label="Age Rating" val={data.attributes.ageRating} />
                            <BuilderAttr label="Airing status" val={data.attributes.status} />
                        </View>
                    </View>

                    <BuilderAttr label="Synopsis" val={data.attributes.synopsis} />

                    {
                        data.attributes.youtubeVideoId
                            ?
                            <View style={{ flex: 1, }}>
                                <View style={{ flex: 1, alignItems: "center", marginVertical: 20 }}>
                                    <TouchableHighlight onPress={() => {
                                        Linking.openURL('https://www.youtube.com/watch?v=' + data.attributes.youtubeVideoId);
                                    }} underlayColor="white" style={{ width: 50 }}>
                                        <FontAwesomeIcon icon={['fab', 'youtube']} color={'white'} size={32} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            :
                            null
                    }

                    <Button onPress={onShare} title="Share" />

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
    },
    scrollView: {
        marginHorizontal: 20
    }
});


export default SerieScreen;