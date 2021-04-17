/// <reference types="react-scripts" />

// get AudioContext type
type AudioContextType = typeof AudioContext

interface Window extends Window {
  webkitAudioContext: AudioContextType
}

// type for Soundfont Adapter
type SoundfontType = typeof Soundfont