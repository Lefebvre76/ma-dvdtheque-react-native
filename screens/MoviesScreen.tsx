import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Avatar, ListItem } from "react-native-elements"
import Movie from '../models/Movie';

export default class MoviesScreen extends React.Component {

    public state: {
        dataSource: Movie[],
        loading: boolean
    }

    constructor(props: any) {
      super(props);
      this.state = {
          dataSource: [],
          loading: true
      };
      this.getRemoteData();
    }

    getRemoteData = () => {
        const url = "http://ma-dvdtheque.test/api/me/movies";
        fetch(url)
        .then(res => res.json())
        .then(res => {
            let movies: Movie[] = res.data.map((json: any) => {return Object.assign(new Movie, json)});
            this.setState({ 
                dataSource: movies,
                loading: false
            });
        })
        .catch(error => {
            console.log("get data error from:" + url + " error:" + error);
            this.setState({loading: false});
        });
    };

    capFirstLetter = (string: String) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                { this.state.loading && (
                    <ActivityIndicator size="large" style={{ marginVertical: "1rem" }} />
                )}
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => this.renderNativeItem(item)}
                    keyExtractor={(item) => item.title }
                />
            </View>
        );
    }
}
