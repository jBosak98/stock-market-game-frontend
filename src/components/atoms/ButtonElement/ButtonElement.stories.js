import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonElement from './ButtonElement';

storiesOf('Atoms/ButtonElement', module)
    .add('Primary', () => <ButtonElement>Button text</ButtonElement>)