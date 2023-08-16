import {useNavigation} from '@react-navigation/native';
import {darkColors} from '@tamagui/themes';
import React from 'react';
import {Paragraph, YStack, Button} from 'tamagui';

export function EmptyState() {
  const {navigate} = useNavigation();

  return (
    <YStack flex={1} alignItems="center">
      <Paragraph color={darkColors.gray1} fontSize={20}>
        No pictures yet
      </Paragraph>
      <Button
        onPress={() => {
          navigate('TakePicture');
        }}>
        Take your first moment!
      </Button>
    </YStack>
  );
}
