import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

type TimeDisplayPickerProps = {
  initialTime?: Date;
  onTimeChange?: (time: Date) => void;
};

export function TimeDisplayPicker({ initialTime, onTimeChange }: TimeDisplayPickerProps) {
  const [selectedTime, setSelectedTime] = useState(initialTime || new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const tintColor = useThemeColor({}, 'tint');

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date) {
      setSelectedTime(date);
      onTimeChange?.(date);
    }
  };

  const formatTime = (date: Date, use24Hour: boolean): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (use24Hour) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      {/* Large Time Display */}
      <View style={styles.timeDisplayContainer}>
        <Text style={[styles.timeDisplay, { color: tintColor }]}>
          {formatTime(selectedTime, is24Hour)}
        </Text>
      </View>

      {/* Time Picker Button */}
      <TouchableOpacity
        style={[
          styles.timePickerButton,
          {
            backgroundColor: tintColor + '20',
            borderColor: tintColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
        onPress={openPicker}
        activeOpacity={0.7}>
        <Text style={[styles.timePickerButtonText, { color: colors.text }]}>
          Change Time
        </Text>
      </TouchableOpacity>

      {/* Format Toggle */}
      <View style={styles.formatToggleContainer}>
        <Text style={[styles.formatToggleText, styles.formatToggleTextLeft, { color: colors.text }]}>
          12 Hour
        </Text>
        <Switch
          value={is24Hour}
          onValueChange={setIs24Hour}
          trackColor={{ false: '#767577', true: tintColor + '80' }}
          thumbColor={is24Hour ? tintColor : '#f4f3f4'}
        />
        <Text style={[styles.formatToggleText, styles.formatToggleTextRight, { color: colors.text }]}>
          24 Hour
        </Text>
      </View>

      {/* Date Time Picker */}
      {showPicker && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={is24Hour}
            display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
            onChange={handleTimeChange}
          />
        </View>
      )}

      {/* Done Button for iOS */}
      {Platform.OS === 'ios' && showPicker && (
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: tintColor }]}
          onPress={() => setShowPicker(false)}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  timeDisplayContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  timeDisplay: {
    fontSize: 96,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  timePickerButton: {
    width: '100%',
    maxWidth: 300,
    padding: 24,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  timePickerButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  formatToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    marginBottom: 24,
  },
  formatToggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  formatToggleTextLeft: {
    marginRight: 16,
  },
  formatToggleTextRight: {
    marginLeft: 16,
  },
  pickerContainer: {
    width: '100%',
    maxWidth: 300,
  },
  doneButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 999,
    minWidth: 120,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
