import { EffectCallback, useEffect } from 'react';

type FuncEffect = (...args: unknown[]) => void;

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

export const useMount = (fn: FuncEffect) => {
  useEffectOnce(() => {
    fn();
  });
};
