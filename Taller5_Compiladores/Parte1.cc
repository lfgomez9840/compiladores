//Parte 1 – Detectando errores semánticos
//Revisa el siguiente fragmento de código en C++:
//float precio = 19.99;
//int unidades = 3;
//string total = precio * unidades;
//1. ¿Existe error semántico?
//2. ¿Por qué ocurre?
//3. Propón dos formas de corregirlo
//1R/ Si, existe un error semantico, el cual es: string total = precio * unidades;
//2R/ El error ocurre porque se intenta asignar el resultado de una operación aritmética (precio * unidades), que es de tipo float, a una variable de tipo string.En C++, no se puede asignar directamente un número (float o int) a una variable de tipo string, ya que son tipos incompatibles. Esto no es un error de sintaxis, sino de significado (semántica) del código.
//3R/ Forma 1:
float precio = 19.99;
int unidades = 3;
float total = precio * unidades;
//Forma 2: 
#include <string>
#include <sstream>

float precio = 19.99;
int unidades = 3;
float resultado = precio * unidades;
std::ostringstream oss;
oss << resultado;
std::string total = oss.str();