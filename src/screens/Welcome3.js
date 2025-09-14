// Welcome3.js
import React from 'react';
import WelcomeTempLate from '../component/WelcomeTempLate';

export default function Welcome3({ navigation }) {
  return (
    <WelcomeTempLate
      activeIndex={2}
      onContinue={() => navigation.navigate('Login1')}
    />
  );
}