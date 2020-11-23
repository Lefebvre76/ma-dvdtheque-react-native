import React from 'react';
import { View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar, ListItem } from "react-native-elements"
import BoxFormatComponent from '../components/BoxFormatComponent';
import Box from '../models/Box';
import Movie from '../models/Movie';

export default class BoxScreen extends React.Component {

    public box: Box = new Box();

    constructor(props: any) {
        super(props);
        this.box = this.props.route.params.box;
    }

    showMovieDetails(item: Movie) {
        this.props.navigation.push('MovieDetails', {movie: item});
    }

    renderNativeItem = (item: Movie) => {
        return  <ListItem bottomDivider onPress={() => this.showMovieDetails(item)}>
                    <Avatar source={{uri: item.poster}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.directorsName()}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                  </ListItem>;
    }

    render() {
        return (
            <View>
                <View style={{ 
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <Text style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '.5rem' }}>{ this.box.name }</Text>
                    <BoxFormatComponent format={ this.box.format }/>
                    <Image
                        resizeMode='contain'
                        style={{ height: '15rem', width: '15rem', marginTop: '.5rem' }}
                        source={{ uri: this.box.cover }}
                    />
                </View>
                <Text style={{ marginBottom: '.5rem', marginLeft: '1rem' }}>
                    { this.box.movies.length > 1 ? this.box.movies.length + ' films' : 'Film' }
                </Text>
                <FlatList
                    data={this.box.movies}
                    renderItem={({item}) => this.renderNativeItem(item)}
                    keyExtractor={(item) => item.title }
                />
            </View>
        );
    }
}
