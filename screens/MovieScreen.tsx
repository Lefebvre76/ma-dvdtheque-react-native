import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Box from '../models/Box';
import Movie from '../models/Movie';

export default class MovieScreen extends React.Component {

    public movie: Movie = new Movie();

    constructor(props: any) {
        super(props);
        this.movie = this.props.route.params.movie;
    }

    showBoxDetails(item: Box) {
        this.props.navigation.push('BoxDetails', {box: item});
    }

    render() {
        return (
            <View style={{ 
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '.5rem' }}>{ this.movie.title }</Text>
                <Text style={{ fontSize: '1rem', color:'grey', marginBottom: '.5rem' }}>{ this.movie.directorsName() }</Text>
                <Image
                    resizeMode='contain'
                    style={{ height: '15rem', width: '15rem', marginTop: '.5rem' }}
                    source={{ uri: this.movie.poster }}
                />
            </View>
        );
    }
}
