export interface Reproducible<T> {
  data(): T;
  duration(): number;
}