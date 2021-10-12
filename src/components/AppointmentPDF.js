import React, { Component } from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { View, StyleSheet, Dimensions } from "react-native";

class AppointmentPDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdf: props.base64
        };
    }

    render() {
        return (
            <View>
                <PDFReader
                   source={{
                        base64: "data:application/pdf;base64,"+this.state.pdf
                     }}
                     style={styles.pdfStyle}
                 />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pdfStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});

export default AppointmentPDF;