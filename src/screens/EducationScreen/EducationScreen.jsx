import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Context as EducationContext } from '../../context/EducationContext/EducationContext';
import styles from './styles';
import LoadingScreen from '../LoadingScreen';

const EducationScreen = props => {
  const { navigation } = props;

  const { state, getEducationRange } = useContext(EducationContext);

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
    VarelaRound_400Regular,
  });

  useEffect(() => {
    // When the screen is opened get all the education contents
    getEducationRange();
    const listener = navigation.addListener('didFocus', () => {
      getEducationRange();
    });
    return () => {
      listener.remove();
    };
  }, []);

  const renderEducationItem = React.useCallback(
    item => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('content', { id: item.item._id })}>
          <View style={styles.topicStyle}>
            <Text style={styles.topicText}>{item.item.topic}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={30} />
          </View>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.screenStyle}>
      <View style={{ flex: 1, borderWidth: 1 }}>
        <Text style={styles.titleTextStyle}> ToothMate </Text>
        <Text style={styles.subTitleTextStyle}>Education Library</Text>
        <FlatList data={state} keyExtractor={education => education._id} renderItem={renderEducationItem} />
      </View>
    </LinearGradient>
  );
};

EducationScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default EducationScreen;
