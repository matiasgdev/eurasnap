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
import {PhotoRecord} from '../store/type';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

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
          keyExtractor={({id}) => id}
          refreshing={status === 'refetching'}
        />
      ) : (
        <EmptyState />
      )}
    </SafeAreaView>
  );
};

function PictureCard(photo: PhotoRecord) {
  const {id, location, uri} = photo;
  const {navigate} = useNavigation();

  return (
    <XStack style={{position: 'relative'}}>
      <Animated.View
        entering={FadeInUp}
        style={styles.card}
        sharedTransitionTag={`card-${id}`}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigate('PictureDetails', {id, location, uri});
          }}>
          <Image
            flexGrow={1}
            height={200}
            width={180}
            resizeMode="contain"
            source={{uri}}
          />
          <XStack
            position="absolute"
            bottom={4}
            right={4}
            paddingHorizontal={8}
            paddingVertical={2}
            borderRadius={12}
            maxWidth={140}
            alignItems="center"
            backgroundColor={lightColors.gray12}>
            <Paragraph fontSize={12} numberOfLines={1}>
              {location}
            </Paragraph>
          </XStack>
        </TouchableWithoutFeedback>
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
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    shadowColor: '#7b7b7b',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 36,
  },
});
