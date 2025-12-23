import { selectSong } from '@/services';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type SongSearchBarProps = {
  onSongSelected?: (songName: string) => void;
};

export function SongSearchBar({ onSongSelected }: SongSearchBarProps) {
  const [songInput, setSongInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSongConfirm = async () => {
    if (!songInput.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await selectSong(songInput);
      if (result.success && result.songName) {
        onSongSelected?.(result.songName);
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter song name..."
          placeholderTextColor="#9CA3AF"
          value={songInput}
          onChangeText={setSongInput}
          onSubmitEditing={handleSongConfirm}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleSongConfirm}
          disabled={isLoading || !songInput.trim()}>
          <Text style={styles.confirmButtonText}>
            {isLoading ? '...' : 'Confirm'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 8,
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    borderColor: '#374151',
  },
  confirmButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

