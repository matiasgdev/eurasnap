import React, {SafeAreaView, StatusBar} from 'react-native';
import {XStack} from 'tamagui';

import {useStore} from '../store/PhotoStore';

import {ErrorBoundary} from '../components/ErrorBoundary';
import {PicturesList} from '../components/PicturesList';
import {TakePictureButton} from '../components/TakePictureButton';
import {InputSearch} from '../components/InputSearch';
import {Error} from '../components/Error';

export const HomeScreen = () => {
  const {query, setQuery, savePicture} = useStore();

  return (
    <SafeAreaView style={{flex: 1}}>
      <XStack
        justifyContent="center"
        marginTop={StatusBar.currentHeight || 12}
        paddingHorizontal={38}>
        <InputSearch flex={1} marginRight={16} {...{query, setQuery}} />
        <TakePictureButton />
      </XStack>
      <ErrorBoundary
        onError={console.error}
        fallback={props => <Error {...props} />}>
        <PicturesList />
      </ErrorBoundary>
    </SafeAreaView>
  );
};
