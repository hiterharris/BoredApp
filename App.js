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

  const fetchData = async () => {
    try {
      let response = await fetch(endpoint)
      let json = await response.json()
      setData(json);
    } catch(error) {
      console.log('error: ', error);
    }
  }

  const handleActivity = () => {
    fetchData();
    setNewActivity(data);
  }

  const handleDetails = () => {
    setIsDetailsActive(!isDetailsActive);
  }

  const renderActivity = () => {
    if (newActivity) return (
      <View style={styles.activityContainer}>
        <Text style={styles.activity}>{data.activity}</Text>
        <Button title={!isDetailsActive ? 'More Details' : 'See Less'} onPress={handleDetails}/>
      </View>
    )
  }

  const renderDetails = () => {
    if (isDetailsActive) return (
      <View style={styles.details}>
        <Text style={styles.detailsItem}>Type: {data.type}</Text>
        <Text style={styles.detailsItem}>Participants: {data.participants}</Text>
        <Text style={styles.detailsItem}>Price: ${data.price}</Text>
      </View>
    )
  }

  return (
    <>
      <View style={styles.App}>
        <StatusBar barStyle="dark-content" />
          <Text style={styles.title}>Bored?</Text>
          <TouchableOpacity style={styles.activityButton} >
            <Button title='Activity Suggestions' color='white' onPress={handleActivity} />
          </TouchableOpacity>
          {renderActivity()}
          {renderDetails()}
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
  activityButton: {
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
  },
  details: {
    paddingTop: 10,
    position: 'absolute',
    bottom: 225,
  },
  detailsItem: {
    fontSize: 18,
    margin: 5,
  }
});

export default App;
