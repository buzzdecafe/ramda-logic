import { expect } from 'chai';

import { of as lvar } from '../src/lvar';
import smap from '../src/smap';
import eq from '../src/eq';
import { fromArray } from '../src/stream';


describe('eq', function() {
  const vu = lvar('u');
  const vv = lvar('v');

  it('returns a goal function', function() {
    expect(eq(vu, vv)).to.be.a('function');
  });

  it('associates two logic variables if they unify in the given state', function() {
    expect(eq(vu, vv)(smap({})).toArray()).to.eql([{'u': vv}]);
  });

  it('associates a logic variable and a value if they unify in the state (1)', function() {
    expect(eq(vu, 'banana')(smap({})).toArray()).to.eql([{'u': 'banana'}]);
  });

  it('associates a logic variable and a value if they unify in the state (2)', function() {
    expect(eq('banana', vu)(smap({})).toArray()).to.eql([{'u': 'banana'}]);
  });

  it('may extend the map when the terms unify', function() {
    expect(eq(vu, 'banana')(smap({'z': 'squirrels'})).toArray()).to.eql([{'u': 'banana', 'z': 'squirrels'}]);
  });

  it('returns empty if the terms cannot be unified', function() {
    expect(eq(vu, 'banana')(smap({'u': 'mango'})).toArray()).to.eql([]);
  });

  it('can unify inside a list (1)', function() {
    const a = fromArray([lvar('x'), 2, 3]);
    const b = fromArray(['banana', 2, 3]);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 'banana'}]);
  });

  it('can unify inside a list (2)', function() {
    const a = fromArray([1, lvar('x'), 3]);
    const b = fromArray([1, 'banana', 3]);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 'banana'}]);
  });

  it('can unify inside a list (3)', function() {
    const a = fromArray([1, 2, lvar('x')]);
    const b = fromArray([1, 2, 'banana']);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 'banana'}]);
  });
  
  it('can unify two variables inside a list', function() {
    const a = fromArray([1, lvar('x'), 3, lvar('y'), 5]);
    const b = fromArray([1, 2, 3, 4, 5]);
    expect(eq(a, b)(smap({})).toArray()).to.eql([{x: 2, y: 4}]);
  });

  it('can fail to unify inside a list', function() {
    const a = fromArray([1, 2, lvar('x')]);
    const b = fromArray(['cherry', 'grape', 'banana']);
    expect(eq(a, b)(smap({})).toArray()).to.eql([]);
  });
});
