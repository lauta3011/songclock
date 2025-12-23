import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SongList } from './molecules/song-list';
import { SongSearchBar } from './molecules/song-search-bar';

type SelectSongProps = {
  onSongsChange?: (songs: string[]) => void;
};

export function SelectSong({ onSongsChange }: SelectSongProps) {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const handleSongSelected = (songName: string) => {
    const newSongs = [...selectedSongs, songName];
    setSelectedSongs(newSongs);
    onSongsChange?.(newSongs);
  };

  return (
    <View style={styles.container}>
      <View style={styles.songSection}>
        <Text style={styles.songSectionTitle}>
          Select Song
        </Text>

        <SongSearchBar onSongSelected={handleSongSelected} />

        <SongList songs={selectedSongs} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    marginBottom: 12,
    color: '#FFFFFF',
  },
});

