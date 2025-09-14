// Welcome1.js
import React from 'react';
import WelcomeTempLate from '../component/WelcomeTempLate';

export default function Welcome1({ navigation }) {
  return (
    <WelcomeTempLate
      activeIndex={0}
      onContinue={() => navigation.navigate('Welcome2')}
    />
  );
}