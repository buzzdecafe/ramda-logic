import { expect } from 'chai';
import exts from '../src/exts';
import { of as lvar } from'../src/lvar';
import smap from '../src/smap';

describe('exts', function() {
  it('adds a binding for a logic variable to a value', function() {
    expect(exts(lvar('x'), 'X', smap({}))).to.eql({x: 'X'});
  });

  it('adds a binding for a logic variable to a logic variable', function() {
    const vy = lvar('y');
    expect(exts(lvar('x'), vy, smap({}))).to.eql({x: vy});
  });

  it('may expand the input s-map', function() {
    const s = smap({'a': 10});
    expect(exts(lvar('x'), 'X', s)).to.eql({a: 10, x: 'X'});
  });

  it('does not mutate the input s-map', function() {
    const s = smap({'a': 10});
    const out = exts(lvar('x'), 'X', s);
    expect(out).to.eql({a: 10, x: 'X'});
    expect(s).to.eql({a: 10});
  });
});
