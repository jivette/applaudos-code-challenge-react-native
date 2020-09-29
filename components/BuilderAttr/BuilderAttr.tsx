import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SectionAttributes = (props) => {
    const { label, val } = props;
    return (
        <View>
            <Text style={styles.title}>{label}</Text>
            <Text style={styles.text}>{val}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 12,
    },
    title: {
        color: "white",
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold'
    }

});

export default SectionAttributes
