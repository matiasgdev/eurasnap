import {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import React from 'react';

function SkeletonCard() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(1000, withTiming(0.5, {duration: 1000})),
        withTiming(1, {duration: 1000}),
      ),
      -1,
      false,
    );
  }, [opacity]);

  return <Animated.View style={[styles.container, {opacity}]} />;
}

export const Skeletons = () => (
  <FlatList
    data={Array(10)}
    renderItem={() => <SkeletonCard />}
    numColumns={2}
  />
);

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 160,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#d9d9d9',
  },
});
