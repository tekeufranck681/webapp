import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Report Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default ReportScreen;
