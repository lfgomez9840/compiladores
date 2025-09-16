# Taller de Laboratorio - Expresiones Regulares en C#

Este proyecto contiene la solución al taller de laboratorio donde se aplican **expresiones regulares en C#** para el reconocimiento de patrones básicos de un lenguaje de programación.

---

## 📌 Objetivos
- Detectar **identificadores válidos**  
- Detectar **números enteros y decimales**  
- Detectar **operadores aritméticos y relacionales**  
- Detectar **palabras reservadas**  
- Realizar un **mini análisis léxico** de un fragmento de código  

---

## 🚀 Cómo ejecutar el proyecto

### ▶️ Ejecutar en línea  
Podemos probar el código directamente sin instalar nada usando [**.NET Fiddle**](https://dotnetfiddle.net):  

[![Ejecutar en .NET Fiddle](https://img.shields.io/badge/Run%20on-.NET%20Fiddle-blue?logo=csharp)](https://dotnetfiddle.net/)  

*(Haz clic en el botón, selecciona **Console**, pega el código de `Taller3.cs` y pulsa **Run**).*

---

### 💻 Opción Local (Linux / Parrot OS / Ubuntu / Debian)
1. Instalar **.NET SDK 8**
   ```bash
   sudo apt update
   sudo apt install -y wget apt-transport-https software-properties-common
   wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
   sudo apt update
   sudo apt install -y dotnet-sdk-8.0
