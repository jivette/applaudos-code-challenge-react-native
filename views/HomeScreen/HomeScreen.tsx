import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AnimeManga from '../../components/AnimeManga/AnimeManga';
import Search from '../../components/Search/Search';
import { Item, Input, Icon, Container, Text } from 'native-base';
import { Picker, Form, Content, Button } from "native-base";
import axios from 'axios';

export const HomeScreen = (props) => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("anime");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        await axios({
            "method": "GET",
            "url": "https://kitsu.io/api/edge/categories",
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                const data = response.data.data.map(category => {
                    return {
                        name: category.attributes.title,
                        description: category.attributes.description,
                        totalMediaCount: category.attributes.totalMediaCount,
                        slug: category.attributes.slug
                    }
                })
                setCategories(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [search])

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, [fetchData]);


    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {
                isLoading ?
                    <Text>Loading ...</Text>
                    :
                    <Container style={{ backgroundColor: "black" }}>
                        <Content>
                            <Form style={{ padding: 20 }}>
                                <Text style={{ color: 'white' }}>Filters</Text>

                                <Item >
                                    <Icon active name='search' />
                                    <Input placeholder='Search' value={search}
                                        onChangeText={search => setSearch(search)}
                                        defaultValue={search} style={{ color: 'white' }}></Input>
                                </Item>
                                <Item picker>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: 120, color: 'white' }}
                                        placeholderStyle={{ color: "white" }}
                                        selectedValue={selected}
                                        onValueChange={(value) => { setSelected(value) }}
                                    >
                                        <Picker.Item label="Anime" value="anime" />
                                        <Picker.Item label="Manga" value="manga" />
                                    </Picker>
                                </Item>
                            </Form>

                            {search ?

                                <Search search={search} typeSerie={selected} navigation={props.navigation} />
                                :
                                <View style={{ flex: 1, }}>
                                    <Text style={{ color: 'orange', fontSize: 30, marginHorizontal: 30, }}>
                                        {selected} </Text>
                                    {categories.map((category, index) => {
                                        return (
                                            <AnimeManga navigation={props.navigation}
                                                key={index} typeSerie={selected} category={category} />
                                        )
                                    })}
                                </View>
                            }

                        </Content>
                    </Container>
            }
        </View >
    );
}


export default HomeScreen;