// semantics.js
// Chequeo semántico simple con tabla de símbolos.

const symbolTable = new Map();

// Si quieres reiniciar la tabla en cada compilación, exporta y usa resetSymbols()
export function resetSymbols() {
  symbolTable.clear();
}

export function analyzeSemantics(ast) {
  const errors = [];

  function evalExpr(node) {
    if (node.type === 'Number') return { type: 'number' };
    if (node.type === 'Var') {
      if (!symbolTable.has(node.name)) {
        errors.push(`Variable no declarada: ${node.name}`);
        return { type: 'unknown' };
      }
      return { type: symbolTable.get(node.name) };
    }
    if (node.type === 'Binary') {
      const L = evalExpr(node.left);
      const R = evalExpr(node.right);
      if (L.type !== 'number' || R.type !== 'number') {
        errors.push(`Operación ${node.op} inválida entre tipos ${L.type} y ${R.type}`);
        return { type: 'unknown' };
      }
      return { type: 'number' };
    }
    errors.push(`Nodo no soportado en semántica: ${node.type}`);
    return { type: 'unknown' };
  }

  const rhsType = evalExpr(ast.value);
  if (rhsType.type === 'number') {
    symbolTable.set(ast.name, 'number');
  }
  return errors;
}