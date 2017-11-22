import { apply, compose, pipe, filter, map, merge, split, nth, match, keys } from 'ramda';

const rx = /^_\.(\d+)/;
const prefix = '_.';
const maxK = pipe(
  filter(match(rx)),
  map(compose(parseInt, nth(1), split('.'))),
  apply(Math.max)
);

export const getNext = s => {
  const next = maxK(keys(s));
  return next === -Infinity ? prefix + '0' : prefix + (next + 1);
};

export default function smap(bindings) {
  return merge({}, bindings);
}
