import { useCallback, useEffect } from "react";

type AsyncEffect = () => void | (() => void) | Promise<void | (() => void)>;

type EffectDeps = Array<any> | any[];

export const useEffectAsync = (effect: AsyncEffect, deps?: EffectDeps) => {
  if (!deps) {
    deps = [effect];
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _asyncEffect = useCallback(effect, deps);

  useEffect(() => {
    const effect = _asyncEffect();

    return () => {
      if (effect instanceof Promise) {
        effect.then((f) => f?.());
      } else {
        effect?.();
      }
    };
  }, [_asyncEffect]);
};
