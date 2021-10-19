import React, { Component } from 'react';
import { Image, StyleSheet } from "react-native";

class AppointmentImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            img: props.base64
        };
    }

    render() {
        return (
            <Image
                style={styles.imgStyle} source={{uri: "data:image/png;base64,"+this.state.img}}
            />
        )
    }
}

const styles = StyleSheet.create({
    imgStyle: {
        alignSelf: "center",
        width: "50%",
        height: 200,
    },
});

export default AppointmentImage;
