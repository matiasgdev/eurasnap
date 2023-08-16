import React, {SafeAreaView, StatusBar} from 'react-native';
import {SlidersHorizontalIcon} from 'lucide-react-native';
import {PicturesList} from '../components/PicturesList';

import {Button, XStack} from 'tamagui';
import {darkColors} from '@tamagui/themes';
import {InputSearch} from '../components/InputSearch';
import {useStore} from '../store/PhotoStore';
import {ErrorBoundary} from '../components/ErrorBoundary';
import {Error} from '../components/Error';

export const HomeScreen = () => {
  const {query, setQuery} = useStore();

  return (
    <SafeAreaView style={{flex: 1}}>
      <XStack
        justifyContent="center"
        marginTop={StatusBar.currentHeight || 12}
        paddingHorizontal={38}>
        <InputSearch flex={1} marginRight={16} {...{query, setQuery}} />
        <Button
          size="$4"
          width={48}
          alignItems="center"
          shadowColor={darkColors.gray1}
          shadowOffset={{width: 4, height: 4}}
          shadowOpacity={0.7}
          elevate
          borderRadius={14}
          backgroundColor={darkColors.orange10}
          icon={<SlidersHorizontalIcon color="#fff" size={24} />}
          onPress={() => {
            // handle take picture camera
          }}
        />
      </XStack>
      <ErrorBoundary
        onError={console.error}
        fallback={props => <Error {...props} />}>
        <PicturesList />
      </ErrorBoundary>
    </SafeAreaView>
  );
};
