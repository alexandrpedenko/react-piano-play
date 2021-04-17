import React, { useEffect, FunctionComponent } from 'react';
import { useAudioContext } from '../AudioContextProvider';
import { useInstrument } from '../../state/Instrument';
import {
  useSoundfont,
  SoundfontProvider,
  withInstrument,
  withInstrumentOnHook,
} from '../../adapters/Soundfont';
import { Keyboard } from '../Keyboard';

// -use -HOC- on CallsBased
// const WrappedKeyboard = withInstrument(Keyboard);

// -use- HOC - on custom Hook useSoundfont
const WrappedKeyboard = withInstrumentOnHook(Keyboard);

export const KeyboardWithInstrument: FunctionComponent = () => {
  const AudioContext = useAudioContext()!; // !check if not null
  const { instrument } = useInstrument();

  // -!- This code was write - when used custom hook useSoundfont(); -!-
  // const { loading, current, play, stop, load } = useSoundfont({ AudioContext });
  // useEffect(() => {
  //   if (!loading && instrument !== current) load(instrument);
  // }, [load, loading, current, instrument]);
  //
  // return <Keyboard loading={loading} play={play} stop={stop} />

  // -!- Use Render Props pattern -!-
  // return (
  //   <SoundfontProvider
  //     AudioContext={AudioContext}
  //     instrument={instrument}
  //     render={(props) => <Keyboard {...props} />}
  //   />
  // );

  // -!- Use HOC pattern
  return (
    <WrappedKeyboard AudioContext={AudioContext} instrument={instrument} />
  );
};
