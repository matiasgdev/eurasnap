import {useNavigation} from '@react-navigation/native';
import {darkColors} from '@tamagui/themes';
import React from 'react';
import {Paragraph, YStack, Button} from 'tamagui';
import {useStore} from '../store/PhotoStore';

export function EmptyState() {
  const {query} = useStore();
  const {navigate} = useNavigation();

  if (query) return null;

  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Paragraph color={darkColors.gray1} fontSize={20}>
        No pictures yet :(
      </Paragraph>
      <Button
        marginTop={12}
        onPress={() => {
          navigate('TakePicture');
        }}>
        Capture your first moment!
      </Button>
    </YStack>
  );
}
