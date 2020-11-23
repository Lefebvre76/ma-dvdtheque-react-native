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
            this.setState({ 
                dataSource: res.data,
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

    renderNativeItem = (item: any) => {
        return  <ListItem bottomDivider>
                    <Avatar source={{uri: item.cover}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.directors.map((director: any) => { return director.name }).join(', ')}</ListItem.Subtitle>
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
