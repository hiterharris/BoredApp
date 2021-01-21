import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

const endpoint = 'https://www.boredapi.com/api/activity/'

const App = () => {
  const [data, setData] = useState([]);
  const [newActivity, setNewActivity] = useState(false);
  const [isDetailsActive, setIsDetailsActive] = useState(false);
  const [detailsButton, setDetailsButton] = useState('More Details');

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [newActivity]);

  console.log(data);
  console.log(isDetailsActive)

  const handleActivity = () => {
    setNewActivity(data);
  }

  const handleDetails = () => {
    setIsDetailsActive(!isDetailsActive);
  }

  const renderActivity = () => {
    if (newActivity) return (
      <View style={styles.activityContainer}>
        <Text style={styles.activity}>{data.activity}</Text>
        <Button title={isDetailsActive ? 'More Details' : 'See Less'} onPress={handleDetails}/>
      </View>
    )
  }

  return (
    <>
      <View style={styles.App}>
        <StatusBar barStyle="dark-content" />
          <Text style={styles.title}>Bored?</Text>
          <TouchableOpacity style={styles.button} >
            <Button title='Activity Suggestions' color='white' onPress={handleActivity} />
          </TouchableOpacity>
          {renderActivity()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  App: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  button: {
    backgroundColor: '#0059b3',
    borderRadius: 8,
    margin: 25,
    padding: 10,
  },
  activityContainer: {
    width: '80%',
  },
  activity: {
    fontSize: 24,
    textAlign: 'center',
  }
});

export default App;
