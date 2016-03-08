# Compiler
This is a learning project of a journey of building Compilers. In this project, I will be using Javascript for building generic compiler that can be easily manipulated to match any language.

# Lexical Analyzer
1. Token
2. TokenClass
3. LexicalAnalyzer

Lexical Analyzer provides the ability to divide the program into multiple meaningful lexical units (Tokens).

- Token
  It describes the architecture of the basic Token

- TokenClass
  It contains multiple Token Classes that are used to differentiate Tokens
  
- LexicalAnalyzer
  Here the magic happens. This function deconstruct the entire program into series of tokens which then can be retrieved by    various methods provided. Also the unmatched Tokens are pushed to Error Stack which can also be retrieved for Error          Checking and Correction.

# Index.html
It provided an Interface to Lexical Analyzer which ability to write code on the fly or upload a already written code by the FileReader.
