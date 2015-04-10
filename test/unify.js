var expect = require('chai').expect;
var lvar = require('../src/lvar');
var unify = require('../src/unify');

describe('unify', function() {
  var vx = lvar('x');
  var vy = lvar('y');
  var vz = lvar('z');
  var vq = lvar('q');

  it('associates two logic variables', function() {
    expect(unify(vx, vy)([])).to.eql([{'x': vy}]);
  });
});
