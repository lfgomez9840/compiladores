using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

class Node
{
    public string Value;
    public List<Node> Children = new List<Node>();

    public Node(string value)
    {
        Value = value;
    }

    // Constructor adicional para aceptar hijos directamente
    public Node(string value, List<Node> children)
    {
        Value = value;
        Children = children;
    }

    public void PrintTree(int level = 0)
    {
        Console.WriteLine(new string(' ', level * 2) + Value);
        foreach (var child in Children)
            child.PrintTree(level + 1);
    }
}

class Parser
{
    private List<string> tokens;
    private int pos = 0;

    public Parser(string expr)
    {
        tokens = Tokenize(expr);
    }

    private List<string> Tokenize(string expr)
    {
        var matches = Regex.Matches(expr, @"\d+|[a-zA-Z_]\w*|[()+\-*/=]");
        var result = new List<string>();
        foreach (Match m in matches)
            result.Add(m.Value);
        return result;
    }

    private string Peek() => pos < tokens.Count ? tokens[pos] : null;
    private string Next() => pos < tokens.Count ? tokens[pos++] : null;
    private void Expect(string token)
    {
        if (Peek() == token) pos++;
        else throw new Exception($"Expected '{token}' but found '{Peek()}'");
    }

    // F -> (E) | id | num
    private Node ParseF()
    {
        if (Peek() == "(")
        {
            Next();
            var node = ParseE();
            Expect(")");
            return new Node("()", new List<Node> { node });
        }
        else if (Regex.IsMatch(Peek() ?? "", @"^[a-zA-Z_]\w*$"))
        {
            return new Node(Next());
        }
        else if (Regex.IsMatch(Peek() ?? "", @"^\d+$"))
        {
            return new Node(Next());
        }
        else
        {
            throw new Exception("Invalid factor");
        }
    }

    // T -> T * F | T / F | F
    private Node ParseT()
    {
        var node = ParseF();
        while (Peek() == "*" || Peek() == "/")
        {
            string op = Next();
            var right = ParseF();
            node = new Node(op, new List<Node> { node, right });
        }
        return node;
    }

    // E -> E + T | E - T | T
    private Node ParseE()
    {
        var node = ParseT();
        while (Peek() == "+" || Peek() == "-")
        {
            string op = Next();
            var right = ParseT();
            node = new Node(op, new List<Node> { node, right });
        }
        return node;
    }

    // S -> id = E
    public Node ParseS()
    {
        string id = Next();
        Expect("=");
        var expr = ParseE();
        return new Node("=", new List<Node> { new Node(id), expr });
    }
}

class Program
{
    static void Main()
    {
        string expr = "z = a * (b + c) - d";
        var parser = new Parser(expr);
        Node tree = parser.ParseS();
        tree.PrintTree();
    }
}