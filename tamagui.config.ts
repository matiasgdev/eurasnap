import {shorthands} from '@tamagui/shorthands';
import {themes, tokens} from '@tamagui/themes';
import {createFont, createTamagui} from 'tamagui';

export default createTamagui({
  themes,
  tokens,
  shorthands,
  fonts: {
    body: createFont({
      family: 'Arial',
      size: {
        1: 12,
        2: 14,
        3: 16,
        4: 18,
      },
      lineHeight: {
        4: 16,
      },
    }),
  },
});
