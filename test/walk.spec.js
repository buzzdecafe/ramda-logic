import { expect } from 'chai';
import { of as lvar, isLvar, equals as lvEq } from '../src/lvar';
import smap from '../src/smap';
import walk from '../src/walk';

describe('walk', function() {
  const s = smap({0: lvar(1), 1: 'banana'});
  it('returns a non-logic-variable argument', function() {
    expect(walk('mango', s)).to.eql('mango');
  });

  it('returns the binding for a logic variable', function() {
    expect(walk(lvar(1), s)).to.eql('banana');
    expect(walk(lvar(0), s)).to.eql('banana');
  });

  it('returns a logic variable if it is not in the s-map', function() {
    const walked = walk(lvar('x'), smap({}));
    expect(isLvar(walked)).to.equal(true);
    expect(lvEq(walked, lvar('x'))).to.equal(true);
  });

  it('recursively looks up a value through logic variables', function() {
    const s = smap({'x': lvar('y'), 'y': lvar('z'), 'z': lvar('a'), 'a': 'VALUE'});
    expect(walk(lvar('a'), s)).to.equal('VALUE');
    expect(walk(lvar('z'), s)).to.equal('VALUE');
    expect(walk(lvar('y'), s)).to.equal('VALUE');
    expect(walk(lvar('x'), s)).to.equal('VALUE');
  });
});
