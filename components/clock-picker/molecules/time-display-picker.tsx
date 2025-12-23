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

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date) {
      setSelectedTime(date);
      onTimeChange?.(date);
    }
  };

  const formatTime = (date: Date, use24Hour: boolean): any => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isEarly = hours <= 12 ? true : false;

    if (use24Hour || isEarly) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return <><Text>{hour12.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}</Text><Text style={styles.twelveHourText}>{ampm}</Text></>;
    }
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      {/* Large Time Display */}
      <View style={styles.timeDisplayContainer}>
        <Text style={styles.timeDisplay}>
          {formatTime(selectedTime, is24Hour)}
        </Text>
      </View>

      {/* Time Picker Button */}
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={openPicker}
        activeOpacity={0.7}>
        <Text style={styles.timePickerButtonText}>
          Change Time
        </Text>
      </TouchableOpacity>

      {/* Format Toggle */}
      <View style={styles.formatToggleContainer}>
        <Text style={[styles.formatToggleText, styles.formatToggleTextLeft]}>
          12 Hour
        </Text>
        <Switch
          value={is24Hour}
          onValueChange={setIs24Hour}
          trackColor={{ false: '#767577', true: '#007AFF80' }}
          thumbColor={is24Hour ? '#007AFF' : '#f4f3f4'}
        />
        <Text style={[styles.formatToggleText, styles.formatToggleTextRight]}>
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
          style={styles.doneButton}
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
    display: 'flex',
    flexDirection: 'column',
    fontSize: 96,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#FFFFFF',
  },
  twelveHourText: {
    fontSize: 48,
    color: '#FFFFFF',
  },
  timePickerButton: {
    width: '100%',
    maxWidth: 300,
    padding: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timePickerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    backgroundColor: '#007AFF',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
