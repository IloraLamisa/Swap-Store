// Welcome2.js
import React from 'react';
import WelcomeTempLate from '../component/WelcomeTempLate';

export default function Welcome2({ navigation }) {
  return (
    <WelcomeTempLate
      activeIndex={1}
      onContinue={() => navigation.navigate('Welcome3')}
    />
  );
}