/**
 * Service functions for alarm app
 */

export interface SongSelectionResult {
  success: boolean;
  songId?: string;
  songName?: string;
  error?: string;
}

/**
 * Handles song selection from user input
 * @param songInput - The song name or ID provided by the user
 * @returns Promise with the result of the song selection
 */
export async function selectSong(songInput: string): Promise<SongSelectionResult> {
  try {
    // Validate input
    if (!songInput || songInput.trim().length === 0) {
      return {
        success: false,
        error: 'Song input cannot be empty',
      };
    }

    // TODO: Integrate with Spotify API to search and select song
    // For now, just return a success response with the input
    console.log('Song selection requested:', songInput);

    return {
      success: true,
      songId: songInput.trim(),
      songName: songInput.trim(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

