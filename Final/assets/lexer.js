// lexer.js
// Tokenizador simple para IDENT, NUMBER, OP, EQUAL, LPAREN, RPAREN y errores.

export function lex(input) {
  const tokens = [];
  const reWS = /\s/;
  const reIdent = /[A-Za-z_]/;
  const reDigit = /[0-9]/;

  let i = 0;
  while (i < input.length) {
    const ch = input[i];

    if (reWS.test(ch)) { i++; continue; }

    if (reIdent.test(ch)) {
      let j = i + 1;
      while (j < input.length && (reIdent.test(input[j]) || reDigit.test(input[j]))) j++;
      tokens.push({ type: 'IDENT', value: input.slice(i, j) });
      i = j; continue;
    }

    if (reDigit.test(ch)) {
      let j = i + 1, hasDot = false;
      while (j < input.length && (reDigit.test(input[j]) || (!hasDot && input[j] === '.'))) {
        if (input[j] === '.') hasDot = true;
        j++;
      }
      tokens.push({ type: 'NUMBER', value: input.slice(i, j) });
      i = j; continue;
    }

    if ("+-*/".includes(ch)) { tokens.push({ type: 'OP', value: ch }); i++; continue; }
    if (ch === '=') { tokens.push({ type: 'EQUAL', value: '=' }); i++; continue; }
    if (ch === '(') { tokens.push({ type: 'LPAREN', value: '(' }); i++; continue; }
    if (ch === ')') { tokens.push({ type: 'RPAREN', value: ')' }); i++; continue; }

    tokens.push({ type: 'ERROR', value: ch, message: `Carácter no reconocido: '${ch}'` });
    i++;
  }
  return tokens;
}