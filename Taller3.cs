using System;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        Console.WriteLine("=== TALLER DE EXPRESIONES REGULARES ===\n");
        
        // Parte 1 - Identificadores
        Console.WriteLine("PARTE 1 - IDENTIFICADORES");
        TestIdentificadores();
        
        // Parte 2 - Números
        Console.WriteLine("\nPARTE 2 - NÚMEROS");
        TestNumeros();
        
        // Parte 3 - Operadores
        Console.WriteLine("\nPARTE 3 - OPERADORES");
        TestOperadores();
        
        // Parte 4 - Palabras reservadas
        Console.WriteLine("\nPARTE 4 - PALABRAS RESERVADAS");
        TestPalabrasReservadas();
        
        // Parte 5 - Mini reto integrador
        Console.WriteLine("\nPARTE 5 - MINI RETO INTEGRADOR");
        AnalizarCodigo();
        
        Console.WriteLine("\nPresiona cualquier tecla para salir...");
        Console.ReadKey();
    }
    
    // Parte 1: Identificadores válidos
    static void TestIdentificadores()
    {
        string patronIdentificador = @"^[a-zA-Z_][a-zA-Z0-9_]*$";
        Regex regexIdentificador = new Regex(patronIdentificador);
        
        string[] ejemplos = {"nombre", "_var1", "user123", "2num", "#var"};
        
        Console.WriteLine("Patrón: " + patronIdentificador);
        foreach(string ejemplo in ejemplos)
        {
            bool esValido = regexIdentificador.IsMatch(ejemplo);
            Console.WriteLine($"{ejemplo} -> {(esValido ? "VÁLIDO" : "INVÁLIDO")}");
        }
    }
    
    // Parte 2: Números enteros y decimales
    static void TestNumeros()
    {
        string patronEnteros = @"^-?\d+$";
        string patronDecimales = @"^-?\d+\.\d+$";
        
        Regex regexEnteros = new Regex(patronEnteros);
        Regex regexDecimales = new Regex(patronDecimales);
        
        string[] ejemplosEnteros = {"123", "0", "-45", "3.14"};
        string[] ejemplosDecimales = {"3.14", "0.5", "-2.71", "123"};
        
        Console.WriteLine("ENTEROS - Patrón: " + patronEnteros);
        foreach(string ejemplo in ejemplosEnteros)
        {
            bool esEntero = regexEnteros.IsMatch(ejemplo);
            Console.WriteLine($"{ejemplo} -> {(esEntero ? "ENTERO" : "NO ENTERO")}");
        }
        
        Console.WriteLine("\nDECIMALES - Patrón: " + patronDecimales);
        foreach(string ejemplo in ejemplosDecimales)
        {
            bool esDecimal = regexDecimales.IsMatch(ejemplo);
            Console.WriteLine($"{ejemplo} -> {(esDecimal ? "DECIMAL" : "NO DECIMAL")}");
        }
    }
    
    // Parte 3: Operadores aritméticos y relacionales
    static void TestOperadores()
    {
        string patronAritmeticos = @"^[\+\-\*/%]$";
        string patronRelacionales = @"^(==|=|<=|>=|<|>|!=)$";
        
        Regex regexAritmeticos = new Regex(patronAritmeticos);
        Regex regexRelacionales = new Regex(patronRelacionales);
        
        string[] operadores = {"+", "-", "*", "/", "%", "==", "=", "<", ">", "<=", ">=", "!="};
        
        Console.WriteLine("ARITMÉTICOS - Patrón: " + patronAritmeticos);
        Console.WriteLine("RELACIONALES - Patrón: " + patronRelacionales);
        
        foreach(string op in operadores)
        {
            bool esAritmetico = regexAritmeticos.IsMatch(op);
            bool esRelacional = regexRelacionales.IsMatch(op);
            
            string tipo = esAritmetico ? "ARITMÉTICO" : (esRelacional ? "RELACIONAL" : "OTRO");
            Console.WriteLine($"{op} -> {tipo}");
        }
    }
    
    // Parte 4: Palabras reservadas
    static void TestPalabrasReservadas()
    {
        string patronReservadas = @"^(if|else|while|for|return)$";
        Regex regexReservadas = new Regex(patronReservadas);
        
        string[] palabras = {"if", "else", "while", "for", "return", "variable", "function"};
        
        Console.WriteLine("Patrón: " + patronReservadas);
        foreach(string palabra in palabras)
        {
            bool esReservada = regexReservadas.IsMatch(palabra);
            Console.WriteLine($"{palabra} -> {(esReservada ? "RESERVADA" : "NO RESERVADA")}");
        }
    }
    
    // Parte 5: Mini reto integrador
    static void AnalizarCodigo()
    {
        string codigo = @"let num = 25;
if(num >= 10) {
return num + 5;
}";
        
        string patronIdentificador = @"[a-zA-Z_][a-zA-Z0-9_]*";
        string patronNumero = @"-?\d+(\.\d+)?";
        string patronOperador = @"[\+\-\*/%]|==|!=|<=|>=|<|>|=";
        string patronReservada = @"\b(if|else|while|for|return|let)\b";
        
        Regex regexIdentificador = new Regex(patronIdentificador);
        Regex regexNumero = new Regex(patronNumero);
        Regex regexOperador = new Regex(patronOperador);
        Regex regexReservada = new Regex(patronReservada);
        
        Console.WriteLine("Código a analizar:");
        Console.WriteLine(codigo);
        Console.WriteLine("\nAnálisis de tokens:");
        
        Console.WriteLine("\nIDENTIFICADORES:");
        foreach(Match match in regexIdentificador.Matches(codigo))
        {
            if(!regexReservada.IsMatch(match.Value))
                Console.WriteLine($"- {match.Value}");
        }
        
        Console.WriteLine("\nNÚMEROS:");
        foreach(Match match in regexNumero.Matches(codigo))
            Console.WriteLine($"- {match.Value}");
        
        Console.WriteLine("\nOPERADORES:");
        foreach(Match match in regexOperador.Matches(codigo))
            Console.WriteLine($"- {match.Value}");
        
        Console.WriteLine("\nPALABRAS RESERVADAS:");
        foreach(Match match in regexReservada.Matches(codigo))
            Console.WriteLine($"- {match.Value}");
    }
}
