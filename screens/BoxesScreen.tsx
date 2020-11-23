import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Avatar, ListItem } from "react-native-elements"
import BoxFormatComponent from '../components/BoxFormatComponent';
import Box from '../models/Box';

export default class BoxesScreen extends React.Component {

    public state: {
        dataSource: Box[],
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
        const url = "http://ma-dvdtheque.test/api/me/boxes";
        fetch(url)
        .then(res => res.json())
        .then(res => {
            let boxes: Box[] = res.data.map((json: any) => {return Box.parsing(json)});

            this.setState({ 
                dataSource: boxes,
                loading: false
            });
        })
        .catch(error => {
            console.log("get data error from:" + url + " error:" + error);
            this.setState({loading: false});
        });
    };

    showBoxDetails(item: Box) {
        this.props.navigation.push('BoxDetails', {box: item});
    }

    renderNativeItem = (item: any) => {
        return  <ListItem bottomDivider onPress={() => this.showBoxDetails(item)}>
                    <Avatar source={{uri: item.cover}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <BoxFormatComponent format={item.format} />
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
                    keyExtractor={(item) => item.bar_code }
                />
            </View>
        );
    }
}
