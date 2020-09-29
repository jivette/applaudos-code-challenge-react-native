import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native';

const SerieItem = (props) => {
    const { navigation, item } = props;

    return (
        <View>
            {Object.entries(item).length > 0 ?

                <TouchableHighlight onPress={() =>
                    navigation.navigate('Detail', { data: item })
                } underlayColor="white">
                    <View style={{ width: 80, margin: 15 }} >
                        {
                            item.attributes.posterImage ?
                                <Image source={{ uri: item.attributes.posterImage.large }} style={{ width: 100, height: 150 }} />
                                :
                                <Image source={{ uri: 'https://www.ultraboardgames.com/uno/gfx/powergrab2_.jpg' }} style={{ width: 100, height: 150 }} />
                        }
                        <Text style={{ color: 'white', marginVertical: 10, fontSize: 10 }}>{item.attributes.canonicalTitle}</Text>
                    </View>
                </TouchableHighlight>
                :
                null
            }
        </View>
    )
}

export default SerieItem
1