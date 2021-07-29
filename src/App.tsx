import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MovieList from './components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MovieList />
    </SafeAreaView>
  );
};

export default App;
