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

const getData = () => {
  return fetch(endpoint)
    .then((response) => response.json())
    .then((json) => {
      console.log('data: ', json);
    })
    .catch((error) => {
      console.error(error);
    });
};
getData();

const App = () => {
  const [data, setData] = useState([]);
  const [newActivity, setNewActivity] = useState(false);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [newActivity]);

  const handleClick = () => {
    setNewActivity(data);
  }

  const renderActivity = () => {
    if (newActivity) return <Text style={styles.activity}>{data.activity}</Text>
  }

  return (
    <>
      <View style={styles.App}>
        <StatusBar barStyle="dark-content" />
          <Text style={styles.title}>Bored?</Text>
          <TouchableOpacity style={styles.button} >
            <Button title='Activity Suggestion' color='white' onPress={handleClick} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  activity: {
    fontSize: 24,
    textAlign: 'center',
  }
});

export default App;
