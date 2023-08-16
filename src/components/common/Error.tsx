import {darkColors} from '@tamagui/themes';
import React from 'react';
import {Paragraph, YStack} from 'tamagui';
import {FallbackProps} from '../ErrorBoundary';

export function Error(props: FallbackProps) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Paragraph color={darkColors.gray1} fontSize={20}>
        An error ocurred
      </Paragraph>
      <Paragraph
        textDecorationLine="underline"
        color={darkColors.blue10}
        onPress={props.resetErrorBoundary}>
        Try again
      </Paragraph>
    </YStack>
  );
}
