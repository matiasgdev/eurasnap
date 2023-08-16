import React from 'react';
import {darkColors} from '@tamagui/themes';
import {Paragraph} from 'tamagui';
import {useStore} from '../store/PhotoStore';

export function ResetFiltersButton({title = 'Try reset filters'}) {
  const {setQuery} = useStore();

  return (
    <Paragraph
      textDecorationLine="underline"
      color={darkColors.blue10}
      onPress={() => {
        setQuery('');
      }}>
      {title}
    </Paragraph>
  );
}
