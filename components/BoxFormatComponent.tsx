import React from 'react';
import { View, Text } from "./Themed";

export default class BoxFormatComponent extends React.Component {

    public format: string = '';

    constructor(props: any) {
        super(props);
        this.format = props.format;
    }

    render() {
        return (
            <View style={{ backgroundColor: this.backgroundColor(), borderRadius: 9999, paddingHorizontal: ".5rem", marginTop: ".25rem" }}>
                <Text style={{ color: this.textColor(), fontSize:".75rem" }}>{this.formatName()}</Text>
            </View>
        )
    }

    protected formatName() {
        switch (this.format) {
            case 'BR':
                return "Blu-Ray"
            break;
            case 'DVD':
                return "DVD"
            break;
            case 'BR3D':
                return "Blu-Ray 3D"
            break;
            case 'BR4K':
                return "Blu-Ray 4K"
            break;
            default:
                break;
        }
    }

    protected backgroundColor() {
        switch (this.format) {
            case 'BR':
                return "#6699CC";
            break;
            case 'BR3D':
                return "#840032";
            break;
            case 'BR4K':
                return "#333745";
            break;
            default:
                return "#FAD4C0";
            break;
        }
    }

    protected textColor() {
        switch (this.format) {
            case 'BR':
            case 'BR4K':
            case 'BR3D':
                return "#FFFFFF";
            break;
            default:
                return "#000000";
            break;
        }
    }
}