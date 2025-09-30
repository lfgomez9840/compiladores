//Analiza el siguiente código en JavaScript:
//let area = (base * altura) / 2 + (0 * altura);
//1. ¿Qué operación puede eliminarse?
//2. Reescribe el código optimizado.
//1R: La operación (0 * altura) puede eliminarse, ya que cualquier número multiplicado por cero siempre da cero y no afecta el resultado de la expresión.
//2R:
let area = (base * altura) / 2;