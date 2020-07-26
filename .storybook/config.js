import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeModeProvider } from "../src/contexts/ThemeModeContext";

addDecorator(story => 
    <ThemeModeProvider>
        {story()}
    </ThemeModeProvider>
);