import { lex } from './lexer.js';
import { Parser, renderTree } from './parser.js';
import { analyzeSemantics, resetSymbols } from './semantics.js';
import { renderTokens, byPhaseMessages } from './ui.js';

const $ = (id) => document.getElementById(id);

async function compileOnce() {
  const btn = $('compileBtn');
  const codeEl = $('code');
  const lexOut = $('lexOut');
  const parseOut = $('parseOut');
  const semOut = $('semOut');
  const valOut = $('valOut');

  btn.classList.add('loading');

  // Permite ver spinner un instante (UX)
  await new Promise(r => setTimeout(r, 120));

  resetSymbols();

  // LÉXICO
  const tokens = lex(codeEl.value.trim());
  const lexErrors = tokens.filter(t => t.type === 'ERROR').map(t => t.message);
  const okLex = lexErrors.length === 0;
  lexOut.innerHTML = renderTokens(tokens) + (okLex ? '' : `<div class="err fade-in" style="margin-top:6px;">${lexErrors.join('<br>')}</div>`);

  // SINTÁCTICO
  let ast = null, okParse = false, parseError = null;
  if (okLex) {
    try {
      const parser = new Parser(tokens);
      ast = parser.parse();
      okParse = true;
      parseOut.classList.add('fade-in');
      parseOut.textContent = renderTree(ast);
    } catch (e) {
      parseError = e.message;
      parseOut.innerHTML = `<div class="err fade-in">${parseError}</div>`;
    }
  } else {
    parseOut.innerHTML = `<div class="err fade-in">No se puede parsear por errores léxicos.</div>`;
  }

  // SEMÁNTICO
  let okSem = false, semErrors = [];
  if (okParse && ast) {
    semErrors = analyzeSemantics(ast);
    okSem = semErrors.length === 0;
    semOut.innerHTML = okSem
      ? `<div class="ok fade-in">La línea es válida de acuerdo a la semántica del lenguaje.</div>`
      : `<div class="err fade-in">${semErrors.join('<br>')}</div>`;
  } else {
    semOut.innerHTML = `<div class="err fade-in">No se puede analizar semánticamente por errores sintácticos.</div>`;
  }

  // VALIDACIÓN
  valOut.innerHTML = byPhaseMessages(okLex, okParse, okSem, lexErrors, parseError, semErrors);

  btn.classList.remove('loading');
}

window.addEventListener('DOMContentLoaded', () => {
  $('compileBtn').addEventListener('click', () => { compileOnce(); });

  // Enter y Ctrl/Cmd+Enter
  $('code').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || !e.shiftKey)) {
      e.preventDefault();
      compileOnce();
    }
  });

  $('code').value = 'num = 4';
});