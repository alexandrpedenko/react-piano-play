import { useState, useRef } from 'react';
import Soundfont, { Player, InstrumentName } from 'soundfont-player';
import { Optional } from '../../domain/types';
import { MidiValue } from '../../domain/note';
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from '../../domain/sound';

interface Settings {
  AudioContext: AudioContextType;
}

interface Adapted {
  loading: boolean;
  current: Optional<InstrumentName>;

  load(instrument?: InstrumentName): Promise<void>;
  play(note: MidiValue): Promise<void>;
  stop(note: MidiValue): Promise<void>;
}

export function useSoundfont({ AudioContext }: Settings): Adapted {
  let activeNodes: AudioNodesRegistry = {};
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
  const [player, setPlayer] = useState<Optional<Player>>(null);
  const audio = useRef(new AudioContext());

  // Load instrument sounds set
  async function load(instrument: InstrumentName = DEFAULT_INSTRUMENT) {
    setLoading(true);

    const player = await Soundfont.instrument(audio.current, instrument);

    setLoading(false);
    setCurrent(instrument);
    setPlayer(player);
  }

  // Check and resume audio.current.state
  async function resume() {
    return audio.current.state === 'suspended'
      ? await audio.current.resume()
      : Promise.resolve();
  }

  // Play & Stop functions
  async function play(note: MidiValue) {
    await resume();

    if (!player) return;

    const node = player.play(note.toString());
    activeNodes = { ...activeNodes, [note]: node };
  }

  async function stop(note: MidiValue) {
    await resume();

    if (!activeNodes[note]) return;

    // !-TS Non-null assertion operator
    activeNodes[note]!.stop();
    activeNodes = { ...activeNodes, [note]: null };
  }

  return {
    loading,
    current,

    load,
    play,
    stop,
  };
}
