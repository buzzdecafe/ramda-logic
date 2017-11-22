import { of as lvar } from './lvar';
import { getNext } from './smap';

// The call/fresh goal constructor creates a fresh (new) logic variable.
// call/fresh's sole argument is a unary function whose binding variable is
// a fresh logic variable and whose body is an expression over which the
// fresh variable's binding is being scoped and which evaluates to a goal.
// (define (call/fresh f )
//   (λg (s/c)
//     (let ((c (cdr s/c)))
//       ((f (var c)) `( ,(car s/c) . ,(+ c 1))))))
export default function fresh(goalFn) {
  return s => {
    const goal = goalFn(lvar(getNext(s)));
    return goal(s);
  };
}

export function fresh2(goalFn) {
  return s => {
    const goal = goalFn(lvar(getNext(s)), lvar(getNext(s)));
    return goal(s);
  };
}

export function fresh3(goalFn) {
  return s => {
    const goal = goalFn(lvar(getNext(s)), lvar(getNext(s)), lvar(getNext(s)));
    return goal(s);
  };
}
