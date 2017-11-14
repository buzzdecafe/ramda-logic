import walk from './walk';
import { isLvar } from './lvar';
import { isStream, cons } from './stream';


export default function lookup(x, s) {
  const v = walk(x, s);
  return isLvar(v) ? v :
    isStream(v) ? cons(lookup(v.head(), s), lookup(v.tail(), s)) :
      v;
}

// (define (lookup* var s)
//   (let ((v (lookup var s)))
//   (cond
//     ((var? v) v)			; if lookup returned var, it is unbound
//     ((pair? v)
//       (cons (lookup* (car v) s)
//       (lookup* (cdr v) s)))
//   (else v))))