# Árbol Sintáctico de Expresiones Matemáticas en C#

Este proyecto contiene dos versiones de un programa en C# que construye e imprime el árbol sintáctico de una expresión matemática, siguiendo una gramática libre de contexto.

## Archivos

- **Fijo.cs**  
  El programa contiene la expresión matemática definida directamente en el código.  
  Ejemplo de expresión:  
z = a * (b + c) - d


- **Solicita_Valores.cs**  
El programa solicita al usuario que ingrese la expresión matemática por consola al momento de ejecutarlo.

## Uso

### 1. Compilar

Puedes compilar cualquiera de los archivos con el siguiente comando (usando .NET SDK):

```bash
csc Fijo.cs
csc Solicita_Valores.cs
2. Ejecutar
Versión con expresión fija
bash
Copy
Fijo.exe
El programa mostrará el árbol sintáctico de la expresión definida en el código.

Versión interactiva
bash
Copy
Solicita_Valores.exe
El programa te pedirá que ingreses una expresión matemática (por ejemplo: z = a * (b + c) - d) y luego mostrará el árbol sintáctico correspondiente.

Ejemplo de salida
=
  z
  -
    *
      a
      ()
        +
          b
          c
    d
Notas
La gramática soportada incluye variables, números, operadores +, -, *, / y paréntesis.
La expresión debe cumplir la forma: id = expresión.