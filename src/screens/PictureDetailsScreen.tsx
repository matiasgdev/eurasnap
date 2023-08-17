import {useRoute} from '@react-navigation/native';
import React, {Dimensions, SafeAreaView} from 'react-native';
import {Image, Paragraph, XStack} from 'tamagui';
import {PhotoRecord} from '../store/type';

const {width, height} = Dimensions.get('window');

export const PictureDetailsScreen = () => {
  const {params} = useRoute();
  const {uri, location} = params as PhotoRecord;

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Image
        source={{uri}}
        width={width}
        height={height - 150}
        resizeMode="contain"
      />
      <XStack marginTop={4} flexGrow={1} justifyContent="center">
        <Paragraph color="black">{location}</Paragraph>
      </XStack>
    </SafeAreaView>
  );
};
