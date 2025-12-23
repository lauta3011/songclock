import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TimeDisplayPicker } from './molecules/time-display-picker';

type ClockPickerProps = {
  onTimeChange?: (time: Date) => void;
};

export function ClockPicker({ onTimeChange }: ClockPickerProps) {
  return (
    <View style={styles.container}>
      <TimeDisplayPicker onTimeChange={onTimeChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
