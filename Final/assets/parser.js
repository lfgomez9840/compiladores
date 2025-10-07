// parser.js
// Parser recursivo descendente para la gramática:
// stmt -> IDENT "=" expr
// expr -> term (("+"|"-") term)*
// term -> factor (("*"|"/") factor)*
// factor -> NUMBER | IDENT | "(" expr ")"

export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }
  peek() { return this.tokens[this.pos]; }
  eat(type) {
    const t = this.peek();
    if (!t || t.type !== type) throw new Error(`Esperaba ${type} y encontré ${t ? t.type : 'EOF'}`);
    this.pos++; return t;
  }
  parse() {
    // stmt
    const id = this.eat('IDENT');
    this.eat('EQUAL');
    const rhs = this.expr();
    if (this.pos !== this.tokens.length) {
      const t = this.peek();
      throw new Error(`Sobraron tokens al final cerca de '${t.value}'`);
    }
    return { type: 'Assign', name: id.value, value: rhs };
  }
  expr() {
    let node = this.term();
    while (this.matchOP('+') || this.matchOP('-')) {
      const op = this.tokens[this.pos - 1].value;
      const right = this.term();
      node = { type: 'Binary', op, left: node, right };
    }
    return node;
  }
  term() {
    let node = this.factor();
    while (this.matchOP('*') || this.matchOP('/')) {
      const op = this.tokens[this.pos - 1].value;
      const right = this.factor();
      node = { type: 'Binary', op, left: node, right };
    }
    return node;
  }
  factor() {
    const t = this.peek();
    if (!t) throw new Error('Expresión incompleta');
    if (t.type === 'NUMBER') { this.pos++; return { type: 'Number', value: Number(t.value) }; }
    if (t.type === 'IDENT') { this.pos++; return { type: 'Var', name: t.value }; }
    if (t.type === 'LPAREN') {
      this.eat('LPAREN');
      const node = this.expr();
      this.eat('RPAREN');
      return node;
    }
    throw new Error(`Token inesperado en factor: ${t.type} '${t.value}'`);
  }
  matchOP(symbol) {
    const t = this.peek();
    if (t && t.type === 'OP' && t.value === symbol) { this.pos++; return true; }
    return false;
  }
}

// Helper para render del AST
export function renderTree(node, indent = '') {
  if (!node) return '';
  const pad = indent;
  switch (node.type) {
    case 'Assign':
      return `${pad}Assign\n${pad}  name: ${node.name}\n${pad}  value:\n${renderTree(node.value, pad + '    ')}`;
    case 'Binary':
      return `${pad}Binary(${node.op})\n${pad}  left:\n${renderTree(node.left, pad + '    ')}\n${pad}  right:\n${renderTree(node.right, pad + '    ')}`;
    case 'Number':
      return `${pad}Number(${node.value})`;
    case 'Var':
      return `${pad}Var(${node.name})`;
    default:
      return `${pad}${node.type}`;
  }
}