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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  console.log('data: ', data.activity);

  return (
    <>
      <View style={styles.App}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>Bored?</Text>
        <TouchableOpacity style={styles.button}>
          <Button title='Activity Suggestion' color='white' />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  App: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#0059b3',
    borderRadius: 8,
    margin: 25,
  },
});

export default App;
