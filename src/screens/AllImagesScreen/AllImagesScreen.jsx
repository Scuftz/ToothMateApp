import React from 'react';
import { View, FlatList, TouchableWithoutFeedback, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Buffer } from 'buffer';
import AppointmentImage from '../../components/AppointmentImage';
import styles from './styles';

global.Buffer = global.Buffer || Buffer.Buffer;

const AllImagesScreen = props => {
  const { navigation } = props;

  const base64images = React.useMemo(() => {
    const images = navigation.getParam('images');
    const preFilterBase64images = images.map(image => {
      return Buffer.from(image.img.data.data).toString('base64');
    });

    return preFilterBase64images.filter(image => image);
  }, [navigation]);

  const renderItem = React.useCallback(
    item => (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('images', {
            images: base64images,
            imageIndex: item.index,
          })
        }
      >
        <View>
          <AppointmentImage key={item.index} base64={item.item} />
        </View>
      </TouchableWithoutFeedback>
    ),
    [base64images, navigation],
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#78d0f5', '#fff', '#78d0f5']} style={styles.container}>
        <FlatList
          numColumns={1}
          data={base64images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      </LinearGradient>
    </View>
  );
};

// Header Options
AllImagesScreen.navigationOptions = () => {
  return {
    title: 'All Images',
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

export default AllImagesScreen;
