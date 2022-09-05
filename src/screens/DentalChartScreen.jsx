import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, Pressable, Platform } from 'react-native';
import { CheckBox } from 'react-native-elements';
import SwitchToggle from 'react-native-switch-toggle';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import ChartEntryList from '../components/ChartEntryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggle: {
    flexDirection: 'row',
    borderColor: '#fff',
    borderRadius: 20,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 18,
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 390,
    height: 500,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headingFont: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    overflow: 'hidden',
    borderRadius: 15,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    elevation: 2,
    backgroundColor: '#F194FF',
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBox: {
    flexDirection: 'row',
    width: 220,
  },
  leftBox: {
    width: 140,
  },
  rightBox: {
    width: 80,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  modalDateText: {
    marginBottom: 15,
    textAlign: 'right',
  },
  modalHeading: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const DentalChartScreen = props => {
  const { navigation } = props;

  const appointments = navigation.getParam('appointments');
  const allChartEntries = React.useMemo(() => new ChartEntryList(), []);
  const [chart, setChart] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toothName, setToothName] = useState('');
  const [toothCodeArray, setToothCodeArray] = useState([]);
  const [hasWisdomTooth, setHasWisdomTooth] = useState(true);

  const toothTappedAlert = React.useCallback(
    (name, arr) => {
      setToothName(name);
      setToothCodeArray(arr);
      setModalVisible(!modalVisible);
    },
    [modalVisible],
  );

  function convertDate(mongoDate) {
    const date = new Date(mongoDate);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    const stringDate = `${day}/${month}/${year}`;
    return stringDate;
  }

  const getAllDentalData = React.useCallback(() => {
    // for each appointment
    appointments.forEach(app => {
      // for each dental treatment in appointment
      app.dentalData.forEach(element => {
        // index number of tooth from dental data
        const index = parseInt(element.substring(3, 5)) - 1; // - 1 to align index starting at 0
        // converting code to full dental treatment name
        let code = '';
        switch (element.substring(5)) {
          case 'VNR':
            code = 'Veneer';
            break;
          case 'FIL':
            code = 'Filling';
            break;
          case 'BRK':
            code = 'Broken Tooth';
            break;
          case 'RTC':
            code = 'Root Canal';
            break;
          case 'EXT':
            code = 'Tooth Extraction';
            break;
          case 'CRW':
            code = 'Dental Crown';
            break;
          case 'BND':
            code = 'Dental Bonding';
            break;
          case 'SEA':
            code = 'Dental Sealant';
            break;
          default:
            // if not found, use dental code
            code = element.substring(5);
            break;
        }
        const codeDateString = `${code} ${convertDate(app.date)}`; // create dental treatment with treatment date
        allChartEntries.updateValue(index, codeDateString); // put dental treatment in array
      });
    });
  }, [allChartEntries, appointments]);

  useEffect(() => {
    allChartEntries.initList(); // initialise checkbox's for dental chart
    getAllDentalData(); // grab, convert, and store dental data in checkbox's
    setChart(allChartEntries); // once data is all set, now store and display dental chart
  }, []);

  if (chart === null) {
    // if still gathering user data, display loading while data loads
    return <AppLoading />;
  }
  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.headingFont}>Tap on any tooth to see your dental history!</Text>
        </View>
        <View style={styles.imageContainer}>
          {hasWisdomTooth ? (
            <Image style={styles.image} source={require('../components/adult_dental_chart.png')} />
          ) : (
            <Image style={styles.image} source={require('../components/child_dental_chart.png')} />
          )}

          <View style={styles.centeredView}>
            <Modal // Pop-Up for when user taps on a tooth
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* Tooth Name Displayed */}
                  <Text style={styles.modalHeading}>{toothName}</Text>
                  {(() => {
                    let dentalTreatment = [];
                    // Storing every dental treatment on tooth in an array to display
                    dentalTreatment = toothCodeArray.map(treatment => (
                      <View key={treatment} style={styles.modalBox}>
                        <View style={styles.leftBox}>
                          <Text style={styles.modalText}>{treatment.substring(0, treatment.length - 10)}</Text>
                        </View>
                        <View style={styles.rightBox}>
                          <Text style={styles.modalDateText}>{treatment.substring(treatment.length - 10)}</Text>
                        </View>
                      </View>
                    ));
                    return dentalTreatment;
                  })()}

                  <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.button}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {(() => {
            // setting up checkbox's using information from each ChartInstance in the ChartEntryList
            let checkBox = [];
            checkBox = chart.allEntries.map(tooth => {
              if (!(!hasWisdomTooth && tooth.name.includes('Third Molar'))) {
                return (
                  <CheckBox
                    key={tooth.id}
                    containerStyle={{
                      position: 'absolute',
                      top: tooth.top,
                      right: tooth.right,
                    }}
                    uncheckedIcon="circle-o"
                    uncheckedColor="#00ff0000"
                    onPress={() => toothTappedAlert(tooth.name, tooth.values)}
                  />
                );
              }
              return null;
            });
            return checkBox;
          })()}
        </View>
        {/* Wisdom Tooth toggle button to switch between dental charts */}
        <View style={styles.toggle}>
          <Text style={styles.toggleText}>Wisdom Tooth</Text>
          <SwitchToggle
            switchOn={hasWisdomTooth}
            onPress={() => setHasWisdomTooth(!hasWisdomTooth)}
            circleColorOff="#9ad2d9"
            circleColorOn="#78d0f5"
            backgroundColorOn="#F0F0F0"
            backgroundColorOff="#F0F0F0"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Header Options
DentalChartScreen.navigationOptions = () => {
  return {
    title: '',
    headerBackTitleVisible: false,

    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
  };
};

export default DentalChartScreen;
