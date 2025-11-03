const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

const programmingQuizzes = [
  {
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming language",
    category: "Programming",
    difficulty: "Easy",
    questions: [
      {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: 3,
        explanation: "JavaScript allows variable declaration using var, let, and const keywords."
      },
      {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "22", "NaN", "Error"],
        correctAnswer: 1,
        explanation: "The + operator performs string concatenation when one operand is a string."
      },
      {
        question: "Which method removes the last element from an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        correctAnswer: 0,
        explanation: "The pop() method removes the last element from an array and returns that element."
      },
      {
        question: "What does NaN stand for?",
        options: ["Not a Number", "Not a Null", "No assigned Number", "New a Number"],
        correctAnswer: 0,
        explanation: "NaN stands for 'Not a Number' and represents an invalid number."
      },
      {
        question: "Which operator is used for strict equality comparison?",
        options: ["==", "===", "=", "!="],
        correctAnswer: 1,
        explanation: "The === operator checks both value and type for equality."
      },
      {
        question: "What is the purpose of the 'use strict' directive?",
        options: [
          "Enables strict mode for more error-checking",
          "Makes JavaScript run faster",
          "Allows using newer JavaScript features",
          "Enables TypeScript compatibility"
        ],
        correctAnswer: 0,
        explanation: "'use strict' enables strict mode which catches common coding errors."
      },
      {
        question: "Which function is used to parse a string to an integer?",
        options: ["parseInt()", "parseFloat()", "Number()", "String()"],
        correctAnswer: 0,
        explanation: "parseInt() converts a string to an integer number."
      },
      {
        question: "What is the scope of a variable declared with 'let'?",
        options: ["Global scope", "Function scope", "Block scope", "Module scope"],
        correctAnswer: 2,
        explanation: "Variables declared with 'let' have block-level scope."
      },
      {
        question: "Which method creates a new array with the results of calling a function on every element?",
        options: ["map()", "filter()", "reduce()", "forEach()"],
        correctAnswer: 0,
        explanation: "The map() method creates a new array with the results of calling a function on every element."
      },
      {
        question: "What is the output of console.log(typeof null)?",
        options: ["null", "undefined", "object", "number"],
        correctAnswer: 2,
        explanation: "typeof null returns 'object', which is a known JavaScript quirk."
      }
    ]
  },
  {
    title: "Python Programming",
    description: "Test your Python programming skills",
    category: "Programming",
    difficulty: "Easy",
    questions: [
      {
        question: "Which of the following is used to define a function in Python?",
        options: ["function", "def", "define", "func"],
        correctAnswer: 1,
        explanation: "The 'def' keyword is used to define functions in Python."
      },
      {
        question: "What is the output of print(3 // 2) in Python?",
        options: ["1.5", "1", "2", "Error"],
        correctAnswer: 1,
        explanation: "The // operator performs floor division in Python."
      },
      {
        question: "Which data type is mutable in Python?",
        options: ["tuple", "string", "list", "int"],
        correctAnswer: 2,
        explanation: "Lists are mutable, meaning their elements can be changed."
      },
      {
        question: "How do you create a comment in Python?",
        options: ["// comment", "# comment", "/* comment */", "-- comment"],
        correctAnswer: 1,
        explanation: "Python uses the # symbol for single-line comments."
      },
      {
        question: "Which method is used to add an element to a list?",
        options: ["append()", "add()", "insert()", "push()"],
        correctAnswer: 0,
        explanation: "The append() method adds an element to the end of a list."
      },
      {
        question: "What does PEP 8 refer to in Python?",
        options: [
          "Python Enhancement Proposal for code style",
          "A Python library",
          "Python version 8",
          "A programming pattern"
        ],
        correctAnswer: 0,
        explanation: "PEP 8 is the style guide for Python code."
      },
      {
        question: "Which of these is NOT a built-in data structure in Python?",
        options: ["list", "tuple", "array", "dictionary"],
        correctAnswer: 2,
        explanation: "Array is not a built-in data structure; it requires importing from the array module."
      },
      {
        question: "What is the purpose of __init__ method?",
        options: [
          "To initialize a class instance",
          "To terminate a program",
          "To import modules",
          "To handle errors"
        ],
        correctAnswer: 0,
        explanation: "__init__ is the constructor method that initializes new objects."
      },
      {
        question: "Which module is used for regular expressions?",
        options: ["regex", "re", "regexp", "pattern"],
        correctAnswer: 1,
        explanation: "The 're' module provides regular expression matching operations."
      },
      {
        question: "How do you handle exceptions in Python?",
        options: ["try-catch", "try-except", "error-handle", "catch-error"],
        correctAnswer: 1,
        explanation: "Python uses try-except blocks for exception handling."
      }
    ]
  },
  {
    title: "Java Programming",
    description: "Test your Java programming knowledge",
    category: "Programming",
    difficulty: "Medium",
    questions: [
      {
        question: "What is the default value of a boolean variable in Java?",
        options: ["true", "false", "null", "0"],
        correctAnswer: 1,
        explanation: "The default value of boolean is false."
      },
      {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        correctAnswer: 1,
        explanation: "The 'extends' keyword is used for class inheritance."
      },
      {
        question: "What is the size of an int in Java?",
        options: ["16 bits", "32 bits", "64 bits", "Depends on platform"],
        correctAnswer: 1,
        explanation: "int in Java is always 32 bits regardless of platform."
      },
      {
        question: "Which collection class implements a dynamic array?",
        options: ["Vector", "ArrayList", "LinkedList", "HashSet"],
        correctAnswer: 1,
        explanation: "ArrayList implements a dynamic array that can grow as needed."
      },
      {
        question: "What is the purpose of the 'final' keyword?",
        options: [
          "To make a variable constant",
          "To prevent method overriding",
          "To prevent inheritance",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "final can be used for variables, methods, and classes with different effects."
      },
      {
        question: "Which method is the entry point of a Java application?",
        options: ["start()", "main()", "run()", "execute()"],
        correctAnswer: 1,
        explanation: "The main() method is the entry point of Java applications."
      },
      {
        question: "What is method overloading?",
        options: [
          "Having multiple methods with same name but different parameters",
          "Redefining a method in subclass",
          "Making a method run faster",
          "Importing methods from other classes"
        ],
        correctAnswer: 0,
        explanation: "Method overloading means multiple methods with same name but different parameters."
      },
      {
        question: "Which package contains the Scanner class?",
        options: ["java.util", "java.io", "java.lang", "java.net"],
        correctAnswer: 0,
        explanation: "Scanner class is in java.util package."
      },
      {
        question: "What is an interface in Java?",
        options: [
          "A blueprint of a class",
          "A type of class",
          "A collection of abstract methods",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "An interface is a reference type containing abstract methods."
      },
      {
        question: "Which keyword is used to create an object?",
        options: ["create", "new", "object", "allocate"],
        correctAnswer: 1,
        explanation: "The 'new' keyword is used to create new objects."
      }
    ]
  },
  {
    title: "C++ Programming",
    description: "Challenge your C++ programming skills",
    category: "Programming",
    difficulty: "Hard",
    questions: [
      {
        question: "What is the difference between ++i and i++?",
        options: [
          "No difference",
          "++i is pre-increment, i++ is post-increment",
          "i++ is faster",
          "++i works only with integers"
        ],
        correctAnswer: 1,
        explanation: "++i increments then returns, i++ returns then increments."
      },
      {
        question: "Which operator is used for dynamic memory allocation?",
        options: ["malloc", "new", "alloc", "create"],
        correctAnswer: 1,
        explanation: "The 'new' operator is used for dynamic memory allocation in C++."
      },
      {
        question: "What is a virtual function?",
        options: [
          "A function that doesn't exist",
          "A function that can be overridden in derived classes",
          "A function that runs faster",
          "A function with no parameters"
        ],
        correctAnswer: 1,
        explanation: "Virtual functions enable runtime polymorphism."
      },
      {
        question: "What is the purpose of const keyword?",
        options: [
          "To make a variable constant",
          "To prevent modification",
          "To improve performance",
          "Both A and B"
        ],
        correctAnswer: 3,
        explanation: "const makes variables immutable and prevents modification."
      },
      {
        question: "Which STL container provides fast random access?",
        options: ["list", "vector", "map", "set"],
        correctAnswer: 1,
        explanation: "vector provides fast random access with O(1) complexity."
      },
      {
        question: "What is a template in C++?",
        options: [
          "A blueprint for creating classes/functions",
          "A type of variable",
          "A preprocessor directive",
          "A memory management technique"
        ],
        correctAnswer: 0,
        explanation: "Templates allow creating generic classes and functions."
      },
      {
        question: "Which access specifier is most restrictive?",
        options: ["public", "private", "protected", "package"],
        correctAnswer: 1,
        explanation: "private is the most restrictive access specifier."
      },
      {
        question: "What is function overloading?",
        options: [
          "Multiple functions with same name but different parameters",
          "Functions that are too long",
          "Functions that call themselves",
          "Functions that are optimized"
        ],
        correctAnswer: 0,
        explanation: "Function overloading allows same function name with different parameters."
      },
      {
        question: "What does RAII stand for?",
        options: [
          "Resource Allocation Is Initialization",
          "Random Access Input Interface",
          "Runtime Application Interface Integration",
          "Remote Access Internet Interface"
        ],
        correctAnswer: 0,
        explanation: "RAII is Resource Allocation Is Initialization, a key C++ idiom."
      },
      {
        question: "Which header file is needed for file operations?",
        options: ["<iostream>", "<fstream>", "<file>", "<stream>"],
        correctAnswer: 1,
        explanation: "<fstream> header is needed for file input/output operations."
      }
    ]
  },
  {
    title: "HTML & CSS",
    description: "Test your web development fundamentals",
    category: "Web Development",
    difficulty: "Easy",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0,
        explanation: "HTML stands for Hyper Text Markup Language."
      },
      {
        question: "Which tag is used for the largest heading?",
        options: ["<h1>", "<head>", "<header>", "<h6>"],
        correctAnswer: 0,
        explanation: "<h1> is used for the largest heading level."
      },
      {
        question: "Which property is used to change text color in CSS?",
        options: ["color", "text-color", "font-color", "text-style"],
        correctAnswer: 0,
        explanation: "The 'color' property is used to change text color."
      },
      {
        question: "What is the default display value for a <div> element?",
        options: ["block", "inline", "flex", "grid"],
        correctAnswer: 0,
        explanation: "<div> elements have 'block' as their default display value."
      },
      {
        question: "Which CSS property controls the space between elements?",
        options: ["margin", "padding", "border", "spacing"],
        correctAnswer: 0,
        explanation: "Margin controls space outside elements, padding controls inside space."
      },
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Computer Style Sheets",
          "Creative Style System",
          "Colorful Style Sheets"
        ],
        correctAnswer: 0,
        explanation: "CSS stands for Cascading Style Sheets."
      },
      {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "class", "styles", "css"],
        correctAnswer: 0,
        explanation: "The 'style' attribute is used for inline CSS styles."
      },
      {
        question: "How do you make a list without bullets in CSS?",
        options: ["list-style: none", "list-type: none", "bullets: none", "list-bullet: none"],
        correctAnswer: 0,
        explanation: "list-style: none removes bullets from lists."
      },
      {
        question: "Which property is used to change the font?",
        options: ["font-family", "font-style", "text-font", "font-type"],
        correctAnswer: 0,
        explanation: "font-family property specifies the font for an element."
      },
      {
        question: "What is the correct HTML for creating a hyperlink?",
        options: [
          "<a href='http://example.com'>Link</a>",
          "<link>http://example.com</link>",
          "<a url='http://example.com'>Link</a>",
          "<hyperlink>http://example.com</hyperlink>"
        ],
        correctAnswer: 0,
        explanation: "<a> tag with href attribute creates a hyperlink."
      }
    ]
  },
  {
    title: "React.js",
    description: "Test your React.js knowledge",
    category: "Web Development",
    difficulty: "Medium",
    questions: [
      {
        question: "What is JSX?",
        options: [
          "A JavaScript extension for XML-like syntax",
          "A new programming language",
          "A CSS framework",
          "A database query language"
        ],
        correctAnswer: 0,
        explanation: "JSX is a syntax extension for JavaScript that looks similar to XML/HTML."
      },
      {
        question: "Which method is used to update state in React class components?",
        options: ["setState()", "updateState()", "changeState()", "modifyState()"],
        correctAnswer: 0,
        explanation: "setState() is used to update component state in class components."
      },
      {
        question: "What is the purpose of React hooks?",
        options: [
          "To add state and lifecycle features to functional components",
          "To connect to external APIs",
          "To style React components",
          "To optimize performance"
        ],
        correctAnswer: 0,
        explanation: "Hooks allow functional components to use state and lifecycle features."
      },
      {
        question: "Which hook is used for side effects?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 0,
        explanation: "useEffect hook is used for side effects in functional components."
      },
      {
        question: "What is the virtual DOM?",
        options: [
          "A lightweight copy of the real DOM",
          "A new type of HTML element",
          "A browser API",
          "A CSS framework"
        ],
        correctAnswer: 0,
        explanation: "Virtual DOM is a lightweight copy of the real DOM for performance optimization."
      },
      {
        question: "How do you pass data to a child component?",
        options: ["Props", "State", "Context", "Refs"],
        correctAnswer: 0,
        explanation: "Data is passed to child components through props."
      },
      {
        question: "What is the key prop used for?",
        options: [
          "To uniquely identify elements in a list",
          "To encrypt component data",
          "To style components",
          "To define component state"
        ],
        correctAnswer: 0,
        explanation: "Key prop helps React identify which items have changed in a list."
      },
      {
        question: "Which method is called after a component is rendered?",
        options: ["componentDidMount", "componentWillMount", "componentWillUpdate", "shouldComponentUpdate"],
        correctAnswer: 0,
        explanation: "componentDidMount is called after a component is rendered to the DOM."
      },
      {
        question: "What is React Context used for?",
        options: [
          "To share data between components without prop drilling",
          "To manage component styles",
          "To handle form submissions",
          "To make API calls"
        ],
        correctAnswer: 0,
        explanation: "Context provides a way to pass data through the component tree without props."
      },
      {
        question: "How do you create a React component?",
        options: [
          "As a function or class",
          "Only as a class",
          "Only as a function",
          "Using special React syntax"
        ],
        correctAnswer: 0,
        explanation: "React components can be created as functions or classes."
      }
    ]
  },
  {
    title: "Node.js & Express",
    description: "Test your backend JavaScript knowledge",
    category: "Backend Development",
    difficulty: "Medium",
    questions: [
      {
        question: "What is Node.js?",
        options: [
          "A JavaScript runtime built on Chrome's V8 engine",
          "A frontend framework",
          "A database management system",
          "A CSS preprocessor"
        ],
        correctAnswer: 0,
        explanation: "Node.js is a JavaScript runtime that executes JavaScript code outside a web browser."
      },
      {
        question: "Which module is used to create a web server in Node.js?",
        options: ["http", "web", "server", "express"],
        correctAnswer: 0,
        explanation: "The http module is used to create web servers in Node.js."
      },
      {
        question: "What is Express.js?",
        options: [
          "A web application framework for Node.js",
          "A database ORM",
          "A template engine",
          "A testing framework"
        ],
        correctAnswer: 0,
        explanation: "Express.js is a minimal and flexible Node.js web application framework."
      },
      {
        question: "How do you handle GET requests in Express?",
        options: ["app.get()", "app.post()", "app.request()", "app.fetch()"],
        correctAnswer: 0,
        explanation: "app.get() handles GET requests in Express.js."
      },
      {
        question: "What is middleware in Express?",
        options: [
          "Functions that have access to request and response objects",
          "Database connection handlers",
          "Template rendering engines",
          "Error handling functions"
        ],
        correctAnswer: 0,
        explanation: "Middleware functions can execute code, modify requests/responses, and call next middleware."
      },
      {
        question: "Which method is used to send JSON response?",
        options: ["res.json()", "res.send()", "res.end()", "res.write()"],
        correctAnswer: 0,
        explanation: "res.json() sends a JSON response with proper content-type header."
      },
      {
        question: "What is package.json used for?",
        options: [
          "To manage project dependencies and scripts",
          "To store database credentials",
          "To configure the web server",
          "To define HTML templates"
        ],
        correctAnswer: 0,
        explanation: "package.json contains project metadata, dependencies, and scripts."
      },
      {
        question: "How do you install project dependencies?",
        options: ["npm install", "npm start", "npm run", "npm build"],
        correctAnswer: 0,
        explanation: "npm install installs all dependencies listed in package.json."
      },
      {
        question: "What is the purpose of process.env?",
        options: [
          "To access environment variables",
          "To process HTML templates",
          "To manage file uploads",
          "To handle database connections"
        ],
        correctAnswer: 0,
        explanation: "process.env gives access to environment variables in Node.js."
      },
      {
        question: "Which method is used to parse incoming JSON payloads?",
        options: ["express.json()", "bodyParser()", "JSON.parse()", "app.json()"],
        correctAnswer: 0,
        explanation: "express.json() is built-in middleware to parse JSON request bodies."
      }
    ]
  },
  {
    title: "SQL Database",
    description: "Test your database management skills",
    category: "Database",
    difficulty: "Medium",
    questions: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Logic",
          "System Query Language"
        ],
        correctAnswer: 0,
        explanation: "SQL stands for Structured Query Language."
      },
      {
        question: "Which clause is used to filter records?",
        options: ["WHERE", "FILTER", "HAVING", "CONDITION"],
        correctAnswer: 0,
        explanation: "WHERE clause is used to filter records based on conditions."
      },
      {
        question: "What is a primary key?",
        options: [
          "A unique identifier for each record",
          "The first column in a table",
          "A foreign key in another table",
          "An indexed column"
        ],
        correctAnswer: 0,
        explanation: "A primary key uniquely identifies each record in a table."
      },
      {
        question: "Which join returns all records when there is a match in either table?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correctAnswer: 3,
        explanation: "FULL OUTER JOIN returns all records when there is a match in either table."
      },
      {
        question: "What is the purpose of GROUP BY clause?",
        options: [
          "To group rows that have the same values",
          "To sort the result set",
          "To filter groups",
          "To combine tables"
        ],
        correctAnswer: 0,
        explanation: "GROUP BY groups rows that have the same values in specified columns."
      },
      {
        question: "Which statement is used to update data?",
        options: ["UPDATE", "MODIFY", "ALTER", "CHANGE"],
        correctAnswer: 0,
        explanation: "UPDATE statement is used to modify existing records."
      },
      {
        question: "What is a foreign key?",
        options: [
          "A field that refers to the primary key of another table",
          "A key that is not unique",
          "The main key of a table",
          "An encrypted key"
        ],
        correctAnswer: 0,
        explanation: "A foreign key creates a relationship between two tables."
      },
      {
        question: "Which function returns the number of rows?",
        options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
        correctAnswer: 0,
        explanation: "COUNT() function returns the number of rows that match criteria."
      },
      {
        question: "What does ACID stand for in databases?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Integrity, Data",
          "Analysis, Computation, Input, Data",
          "Application, Code, Interface, Database"
        ],
        correctAnswer: 0,
        explanation: "ACID properties ensure reliable transaction processing."
      },
      {
        question: "Which statement is used to delete a table?",
        options: ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "ERASE TABLE"],
        correctAnswer: 0,
        explanation: "DROP TABLE statement is used to delete an existing table."
      }
    ]
  },
  {
    title: "Git & GitHub",
    description: "Test your version control knowledge",
    category: "Tools",
    difficulty: "Easy",
    questions: [
      {
        question: "What is Git?",
        options: [
          "A version control system",
          "A programming language",
          "An operating system",
          "A database system"
        ],
        correctAnswer: 0,
        explanation: "Git is a distributed version control system."
      },
      {
        question: "Which command is used to clone a repository?",
        options: ["git clone", "git copy", "git pull", "git download"],
        correctAnswer: 0,
        explanation: "git clone creates a copy of an existing repository."
      },
      {
        question: "What does 'git push' do?",
        options: [
          "Uploads local commits to remote repository",
          "Downloads changes from remote",
          "Stages changes",
          "Creates a new branch"
        ],
        correctAnswer: 0,
        explanation: "git push uploads local repository content to a remote repository."
      },
      {
        question: "Which command shows the status of working directory?",
        options: ["git status", "git log", "git show", "git info"],
        correctAnswer: 0,
        explanation: "git status shows the state of the working directory and staging area."
      },
      {
        question: "What is a branch in Git?",
        options: [
          "A parallel version of the repository",
          "A backup of the code",
          "A compiled version",
          "A deployed version"
        ],
        correctAnswer: 0,
        explanation: "A branch is a parallel line of development in Git."
      },
      {
        question: "Which command creates a new branch?",
        options: ["git branch", "git new-branch", "git create", "git checkout -b"],
        correctAnswer: 0,
        explanation: "git branch creates a new branch, git checkout -b creates and switches."
      },
      {
        question: "What is a commit?",
        options: [
          "A snapshot of changes in the repository",
          "A message to team members",
          "A backup of files",
          "A deployment to server"
        ],
        correctAnswer: 0,
        explanation: "A commit is a snapshot of changes with a descriptive message."
      },
      {
        question: "Which command stages all changes?",
        options: ["git add .", "git stage all", "git commit all", "git save all"],
        correctAnswer: 0,
        explanation: "git add . stages all changes in the current directory."
      },
      {
        question: "What is GitHub?",
        options: [
          "A web-based hosting service for Git repositories",
          "A Git client application",
          "A programming language",
          "A database system"
        ],
        correctAnswer: 0,
        explanation: "GitHub is a platform for hosting and collaborating on Git repositories."
      },
      {
        question: "Which command shows the commit history?",
        options: ["git log", "git history", "git commits", "git show-all"],
        correctAnswer: 0,
        explanation: "git log shows the commit history in chronological order."
      }
    ]
  },
  {
    title: "TypeScript",
    description: "Test your TypeScript knowledge",
    category: "Programming",
    difficulty: "Medium",
    questions: [
      {
        question: "What is TypeScript?",
        options: [
          "A typed superset of JavaScript",
          "A new programming language",
          "A JavaScript framework",
          "A database language"
        ],
        correctAnswer: 0,
        explanation: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
      },
      {
        question: "Which keyword is used to define a type?",
        options: ["type", "interface", "Both A and B", "typedef"],
        correctAnswer: 2,
        explanation: "Both 'type' and 'interface' can be used to define types in TypeScript."
      },
      {
        question: "What is the purpose of 'any' type?",
        options: [
          "To opt-out of type checking",
          "To represent any value",
          "To handle dynamic content",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "'any' type allows opting out of type checking and can represent any value."
      },
      {
        question: "How do you define an optional property?",
        options: ["property?: type", "property?: type?", "optional property: type", "property: type?"],
        correctAnswer: 0,
        explanation: "The ? symbol makes a property optional in TypeScript."
      },
      {
        question: "What are generics in TypeScript?",
        options: [
          "A way to create reusable components",
          "A type of variable",
          "A built-in function",
          "A compilation option"
        ],
        correctAnswer: 0,
        explanation: "Generics enable creating components that work with multiple types."
      },
      {
        question: "Which file extension is used for TypeScript?",
        options: [".ts", ".typescript", ".jsx", ".tsx"],
        correctAnswer: 0,
        explanation: ".ts is the file extension for TypeScript files."
      },
      {
        question: "What is type inference?",
        options: [
          "Automatic type detection by TypeScript",
          "Manual type declaration",
          "Type conversion",
          "Type validation"
        ],
        correctAnswer: 0,
        explanation: "TypeScript can automatically infer types based on assigned values."
      },
      {
        question: "How do you compile TypeScript to JavaScript?",
        options: ["tsc", "typescript-compile", "ts-compile", "compile-ts"],
        correctAnswer: 0,
        explanation: "tsc is the TypeScript compiler command."
      },
      {
        question: "What is an enum?",
        options: [
          "A way to define named constants",
          "A type of array",
          "A function type",
          "A module system"
        ],
        correctAnswer: 0,
        explanation: "Enums allow defining a set of named constants in TypeScript."
      },
      {
        question: "Which keyword is used for type assertions?",
        options: ["as", "assert", "type", "cast"],
        correctAnswer: 0,
        explanation: "The 'as' keyword is used for type assertions in TypeScript."
      }
    ]
  }
];

// Connect and seed
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    await Quiz.deleteMany({});
    console.log('Cleared existing quizzes');
    
    await Quiz.insertMany(programmingQuizzes);
    console.log(`Database seeded successfully with ${programmingQuizzes.length} quizzes`);
    
    // Display quiz counts
    const quizCount = await Quiz.countDocuments();
    console.log(`Total quizzes in database: ${quizCount}`);
    
    process.exit();
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });