import React, { useContext } from 'react';
import { Text, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Context } from '../../context/EducationContext/EducationContext';
import styles from './styles';

const EducationContentScreen = props => {
  const { navigation } = props;

  const { state } = useContext(Context);

  const { topic, content } = state.find(educationContent => educationContent._id === navigation.getParam('id'));

  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{topic}</Text>
        <Text style={styles.contentStyle}>{content}</Text>
      </ScrollView>
    </LinearGradient>
  );
};

// Header Options
EducationContentScreen.navigationOptions = () => {
  return {
    title: 'Education',
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

export default EducationContentScreen;
