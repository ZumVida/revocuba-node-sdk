export interface TokenHandler {
  set: (p: string) => void;
  get?: () => string | null;
  getPromise?: () => Promise<string | null>;
}
