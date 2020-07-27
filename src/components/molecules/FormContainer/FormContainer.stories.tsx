import React from 'react';
import { storiesOf } from '@storybook/react';
import FormContainer from './FormContainer';
import Grid from '@material-ui/core/Grid';
import SimpleTextField from '../../atoms/SimpleTextField/SimpleTextField';

storiesOf('Molecules/FormContainer', module).add('Primary', () => (
  <FormContainer
    title="Example"
    linkUrl="#"
    linkText="Example text"
    onSubmit={() => console.log('example')}
  >
    <Grid item xs={12}>
      <SimpleTextField
        name="Example"
        labelName="Example"
        variantType="outlined"
        autoComplete="Example"
        value="Example"
        onChange={() => console.log('example')}
      />
    </Grid>
    <Grid item xs={12}>
      <SimpleTextField
        name="Example"
        labelName="Example"
        variantType="outlined"
        autoComplete="Example"
        value="Example"
        onChange={() => console.log('example')}
      />
    </Grid>
  </FormContainer>
));
