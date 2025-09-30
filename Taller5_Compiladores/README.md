# Taller de Análisis Semántico, Optimización y Pseudocódigo de Ensamblador

**Autor:** Luis Felipe Gomez  
**Correo:** luis.gomez.0592@miremington.edu.co

---

## Ejercicio 1: Detección de errores semánticos en C++

### Código analizado
```cpp
float precio = 19.99;
int unidades = 3;
string total = precio * unidades;
Respuestas
¿Existe error semántico?
Sí, existe un error semántico.
¿Por qué ocurre?
Porque se intenta asignar el resultado de una operación aritmética (float) a una variable de tipo string, lo cual no es compatible en C++.
Dos formas de corregirlo:
Usar una variable numérica para el total:
cpp
Copy
float total = precio * unidades;
Convertir el resultado a string:
cpp
Copy
#include <string>
float precio = 19.99;
int unidades = 3;
float resultado = precio * unidades;
std::string total = std::to_string(resultado);
Ejercicio 2: Optimización de código en JavaScript
Código original
javascript
Copy
let area = (base * altura) / 2 + (0 * altura);
Respuestas
¿Qué operación puede eliminarse?
La operación (0 * altura) puede eliminarse porque siempre da cero.
Código optimizado:
javascript
Copy
let area = (base * altura) / 2;
Ejercicio 3: Pseudocódigo de ensamblador simple
Instrucción a traducir
k = (x + y) - (z * 2)
Pseudocódigo de ensamblador
LOAD x        ; Cargar x en el acumulador
ADD y         ; Sumar y al acumulador (acumulador = x + y)
STORE temp    ; Guardar resultado temporalmente

LOAD z        ; Cargar z en el acumulador
MUL 2         ; Multiplicar por 2 (acumulador = z * 2)

LOAD temp     ; Recuperar (x + y)
SUB z         ; Restar z (acumulador = (x + y) - z)
SUB z         ; Restar z nuevamente (acumulador = (x + y) - (z * 2))
STORE k       ; Guardar el resultado en k
Fin del taller