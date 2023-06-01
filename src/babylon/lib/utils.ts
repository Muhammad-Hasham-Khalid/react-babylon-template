import { MayBePromise } from "./types";

export async function resolveValue<T>(
  mayBePromise: MayBePromise<T>
): Promise<T> {
  return mayBePromise instanceof Promise ? await mayBePromise : mayBePromise;
}
