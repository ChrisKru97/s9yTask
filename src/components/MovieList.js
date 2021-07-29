import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import {baseUrl} from '../constants';
import useFetchMovies from '../hooks';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
  },
  poster: {
    marginRight: 8,
    height: 50,
    width: 50,
  },
  textContainer: {
    flex: 1,
  },
});

const MovieList = () => {
  const {movies, loading, sortMode, sort} = useFetchMovies();

  const renderItem = useCallback(({index, item}) => {
    if (!item) {
      return null;
    }
    const {title, episode_number: episodeNumber, poster} = item;
    return (
      <View key={index} style={styles.itemContainer}>
        <Image
          resizeMode="contain"
          style={styles.poster}
          source={{uri: `${baseUrl}/public/images/${poster}`}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Title: {title}</Text>
          <Text style={styles.description}>
            Episode number: {episodeNumber}
          </Text>
        </View>
      </View>
    );
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.listContainer}
        data={movies}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
      <Button title={`Sort: ${sortMode}`} onPress={sort} />
    </View>
  );
};

export default MovieList;
