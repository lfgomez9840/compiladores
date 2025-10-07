export function renderTokens(tokens) {
  if (!tokens.length) return '';
  return tokens.map((t, idx) => {
    let cls = 'badge';
    if (t.type === 'IDENT') cls += ' id';
    else if (t.type === 'NUMBER') cls += ' num';
    else if (t.type === 'OP') cls += ' op';
    else if (t.type === 'EQUAL') cls += ' eq';
    else if (t.type === 'LPAREN' || t.type === 'RPAREN') cls += ' par';
    const label = t.type === 'ERROR' ? `ERROR('${t.value}')` : `${t.type}('${t.value}')`;
    // delay para entrada escalonada
    return `<span class="${cls}" style="animation-delay:${idx * 40}ms">${label}</span>`;
  }).join(' ');
}

export function byPhaseMessages(okLex, okParse, okSem, lexErrs = [], parseErr = null, semErrs = []) {
  const msgs = [];
  if (okLex) msgs.push(`<div class="ok">• Léxico OK</div>`);
  else msgs.push(`<div class="err">× Léxico: ${lexErrs.join('; ')}</div>`);

  if (okParse) msgs.push(`<div class="ok">• Sintáctico OK</div>`);
  else msgs.push(`<div class="err">× Sintáctico: ${parseErr}</div>`);

  if (okSem) msgs.push(`<div class="ok">• Semántico OK</div>`);
  else msgs.push(`<div class="err">× Semántico: ${semErrs.join('; ')}</div>`);

  return `<div class="phase-msg pop-in">${msgs.join('')}</div>`;
}