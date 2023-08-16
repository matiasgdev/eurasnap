import React, {
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {lightColors} from '@tamagui/themes';

import Animated, {FadeInUp} from 'react-native-reanimated';
import {Paragraph, XStack, Image} from 'tamagui';

import {useStore} from '../store/PhotoStore';
import {EmptyState} from './EmptyState';
import {Skeletons} from './SkeletonCard';
import {TakePictureButton} from './TakePictureButton';
import {PhotoRecord} from '../store/type';

export const PicturesList = () => {
  const {pictures, status, error} = useStore();

  if (status === 'rejected') {
    // fire error boundary
    throw error;
  }

  return (
    <SafeAreaView style={styles.container}>
      {status === 'pending' ? (
        <Skeletons />
      ) : pictures.length ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 86,
            paddingVertical: 24,
            width: Dimensions.get('screen').width,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={pictures}
          renderItem={({item}) => <PictureCard {...item} />}
          keyExtractor={item => item.key}
          ListFooterComponent={<TakePictureButton />}
          refreshing={status === 'refetching'}
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
};

function PictureCard(photo: PhotoRecord) {
  const {key, location, uri} = photo;

  return (
    <XStack style={{position: 'relative'}}>
      <Animated.View
        entering={FadeInUp}
        style={styles.card}
        sharedTransitionTag={`card-${key}`}>
        <Image
          flexGrow={1}
          marginVertical={12}
          height={100}
          width={150}
          resizeMode="center"
          source={{uri}}
        />
        <XStack
          width={160}
          flex={1}
          alignItems="flex-end"
          justifyContent="space-between"
          paddingHorizontal={16}
          marginTop={8}>
          <XStack
            paddingHorizontal={8}
            paddingVertical={2}
            borderRadius={12}
            columnGap={4}
            alignItems="center"
            backgroundColor={lightColors.orange8}>
            <Paragraph fontSize={12}>{location}</Paragraph>
          </XStack>
        </XStack>
      </Animated.View>
    </XStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    paddingTop: 16,
    paddingBottom: 8,
    margin: 8,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#7b7b7b',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 36,
  },
});