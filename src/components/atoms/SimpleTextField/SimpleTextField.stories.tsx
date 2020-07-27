import React from 'react';
import { storiesOf } from '@storybook/react';
import SimpleTextField from './SimpleTextField';

storiesOf('Atoms/SimpleTextField', module).add('Primary', () => (
  <SimpleTextField
    name="example"
    labelName="example"
    variantType="outlined"
    autoComplete="example"
    value="Example"
    onChange={() => console.log('example')}
  />
));
