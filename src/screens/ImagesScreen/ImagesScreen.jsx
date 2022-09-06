import React, { useState } from 'react';
import { View, ScrollView, Dimensions, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import ImageZoom from 'react-native-image-pan-zoom';
import AppointmentImage from '../../components/AppointmentImage';
import styles from './styles';

const ImagesScreen = props => {
  const { navigation } = props;

  const index = navigation.getParam('imageIndex');
  const base64images = navigation.getParam('images');

  const [currentImageIndex, setCurrentImageIndex] = useState(index ?? 0);
  const [currentImage, setCurrentImage] = useState(base64images[currentImageIndex]);

  const hasPreviousImage = currentImageIndex > 0;
  const hasNextImage = currentImageIndex < base64images.length - 1;

  const showNextImage = () => {
    if (hasNextImage) {
      setCurrentImage(base64images[currentImageIndex + 1]);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const showPreviousImage = () => {
    if (hasPreviousImage) {
      setCurrentImage(base64images[currentImageIndex - 1]);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const getButtons = () => {
    if (base64images.length > 1) {
      return (
        <View style={styles.buttonViewStyle}>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Previous"
            onPress={showPreviousImage}
            disabled={!hasPreviousImage}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title="Next"
            onPress={showNextImage}
            disabled={!hasNextImage}
          />
        </View>
      );
    }
  };

  return (
    <LinearGradient colors={['#78d0f5', '#fff', '#78d0f5']} style={styles.container}>
      <ScrollView>
        <View style={styles.containerImage}>
          <ImageZoom cropWidth={Dimensions.get('window').width} cropHeight={500} imageWidth={400} imageHeight={300}>
            <AppointmentImage key={currentImageIndex} base64={currentImage} />
          </ImageZoom>
          {getButtons()}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Header Options
ImagesScreen.navigationOptions = () => {
  return {
    title: 'Images',
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerStyle: {
      backgroundColor: '#78d0f5',
    },
    cardStyle: {
      backgroundColor: 'white',
    },
  };
};

export default ImagesScreen;
