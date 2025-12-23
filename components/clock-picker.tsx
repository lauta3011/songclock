import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { selectSong } from '../services';

type ClockPickerProps = {
  onTimeChange?: (time: Date) => void;
};

export function ClockPicker({ onTimeChange }: ClockPickerProps) {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [songInput, setSongInput] = useState('');
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const isDark = colorScheme === 'dark';
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

  const handleSongConfirm = async () => {
    if (!songInput.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await selectSong(songInput);
      if (result.success && result.songName) {
        setSelectedSong(result.songName);
        setSongInput('');
      } else {
        console.error('Song selection failed:', result.error);
        // TODO: Show error message to user
      }
    } catch (error) {
      console.error('Error selecting song:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Large Time Display */}
      <View style={styles.timeDisplayContainer}>
        <Text 
          style={[styles.timeDisplay, { color: tintColor }]}>
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
          }
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

      {/* Song Selection Section */}
      <View style={styles.songSection}>
        <Text style={[styles.songSectionTitle, { color: colors.text }]}>
          Select Song
        </Text>
        
        {selectedSong && (
          <View style={[styles.selectedSongContainer, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}>
            <Text style={[styles.selectedSongLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Selected:</Text>
            <Text style={[styles.selectedSongText, { color: colors.text }]}>
              {selectedSong}
            </Text>
          </View>
        )}

        <View style={styles.songInputContainer}>
          <TextInput
            style={[
              styles.songInput,
              {
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                color: colors.text,
                borderColor: isDark ? '#374151' : '#D1D5DB',
              }
            ]}
            placeholder="Enter song name..."
            placeholderTextColor="#9CA3AF"
            value={songInput}
            onChangeText={setSongInput}
            onSubmitEditing={handleSongConfirm}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: tintColor }]}
            onPress={handleSongConfirm}
            disabled={isLoading || !songInput.trim()}>
            <Text style={styles.confirmButtonText}>
              {isLoading ? '...' : 'Confirm'}
            </Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  songSection: {
    width: '100%',
    maxWidth: 300,
    marginTop: 16,
  },
  songSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  selectedSongContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedSongLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  selectedSongText: {
    fontSize: 16,
    fontWeight: '600',
  },
  songInputContainer: {
    flexDirection: 'row',
  },
  songInput: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 8,
  },
  confirmButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
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

