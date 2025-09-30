//Traduce la siguiente instrucción a un pseudocódigo de ensamblador simple:
//k = (x + y) - (z * 2)
//Sugerencia: utiliza instrucciones como LOAD, ADD, SUB, MUL, STORE.
// LOAD carga un valor en el acumulador.
//• ADD, SUB, MUL realizan operaciones sobre el acumulador.
//• STORE guarda el resultado en una variable.
LOAD x        ; Cargar x en el acumulador
ADD y         ; Sumar y al acumulador (acumulador = x + y)
LOAD z        ; Cargar z en el acumulador
MUL 2         ; Multiplicar el acumulador por 2 (acumulador = z * 2)
STORE temp    ; Guardar el resultado temporalmente en 'temp'
LOAD x        ; Volver a cargar x en el acumulador
ADD y         ; Sumar y (acumulador = x + y)
SUB temp      ; Restar temp (acumulador = (x + y) - (z * 2))
STORE k       ; Guardar el resultado final en k