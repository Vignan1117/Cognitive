import type { Difficulty, Language, Algorithm } from './types';

export const LANGUAGES: Language[] = ['Python', 'JavaScript', 'Java', 'C', 'C#', 'Ruby'];

export const CHALLENGE_UNLOCK_REQUIREMENTS: Record<number, number> = {
    1: 2, // Need 2 Beginner challenges to unlock Intermediate
    2: 3, // Need 3 Intermediate challenges to unlock Advanced
};

export const ALGORITHMS: Algorithm[] = [
    {
        title: "Bubble Sort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        category: "Sorting",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def bubble_sort(arr):
    n = len(arr)
    # Traverse through all array elements
    for i in range(n):
        swapped = False
        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Traverse the array from 0 to n-i-1
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        # If no two elements were swapped by inner loop, then break
        if not swapped:
            break
    return arr

# Driver code to test above
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
`
    },
    {
        title: "Binary Search",
        description: "An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.",
        category: "Searching",
        language: "Python",
        meta: { type: 'search', dataKey: 'arr', targetKey: 'target' },
        code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    mid = 0

    while low <= high:
        mid = low + (high - low) // 2

        # Check if target is present at mid
        if arr[mid] == target:
            return mid
        # If target is greater, ignore left half
        elif arr[mid] < target:
            low = mid + 1
        # If target is smaller, ignore right half
        else:
            high = mid - 1

    # If we reach here, then the element was not present
    return -1

# Test array
arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23

# Function call
result = binary_search(arr, target)
`
    },
    {
        title: "Selection Sort",
        description: "A sorting algorithm that divides the input into sorted and unsorted regions, repeatedly selecting the minimum element from the unsorted region.",
        category: "Sorting",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def selection_sort(arr):
    n = len(arr)

    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr

# Driver code
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = selection_sort(arr)
`
    },
    {
        title: "Insertion Sort",
        description: "A sorting algorithm that builds the final sorted array one item at a time by inserting elements into their correct position.",
        category: "Sorting",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def insertion_sort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        # Insert the key at its correct position
        arr[j + 1] = key

    return arr

# Driver code
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = insertion_sort(arr)
`
    },
    {
        title: "Linear Search",
        description: "A simple search algorithm that checks every element in the list one by one until finding the target or reaching the end.",
        category: "Searching",
        language: "Python",
        meta: { type: 'search', dataKey: 'arr', targetKey: 'target' },
        code: `def linear_search(arr, target):
    # Traverse through all elements
    for i in range(len(arr)):
        if arr[i] == target:
            return i

    # If element not found
    return -1

# Test array
arr = [64, 34, 25, 12, 22, 11, 90]
target = 25

# Function call
result = linear_search(arr, target)
`
    },
    {
        title: "Merge Sort",
        description: "A divide-and-conquer sorting algorithm that divides the array in half, recursively sorts each half, and merges them back together.",
        category: "Sorting",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Driver code
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = merge_sort(arr)
`
    },
    {
        title: "Quick Sort",
        description: "A divide-and-conquer sorting algorithm that partitions the array around a pivot element and recursively sorts the partitions.",
        category: "Sorting",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# Driver code
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(arr)
`
    },
    {
        title: "Fibonacci Sequence",
        description: "A sequence where each number is the sum of the two preceding ones. Common example of recursion and dynamic programming.",
        category: "Fundamentals",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 fibonacci numbers
arr = [fibonacci(i) for i in range(10)]
print(arr)
`
    },
    {
        title: "Prime Number Check",
        description: "Determines if a given number is prime by checking divisibility from 2 to its square root.",
        category: "Fundamentals",
        language: "Python",
        meta: { type: 'search', dataKey: 'arr', targetKey: 'target' },
        code: `def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    # Check odd divisors up to sqrt(n)
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Test with multiple numbers
arr = [2, 3, 4, 5, 10, 13, 17, 20, 23]
primes = [n for n in arr if is_prime(n)]
print(primes)
`
    },
    {
        title: "Depth-First Search",
        description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
        category: "Fundamentals",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    print(f"Visiting {node}")

    for neighbor in graph.get(node, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited

# Simple graph representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['C']
}

# Start DFS from node A
result = dfs(graph, 'A')
arr = list(result)
`
    },
    {
        title: "Breadth-First Search",
        description: "A graph traversal algorithm that explores vertices in layers, visiting all neighbors before moving to the next level.",
        category: "Fundamentals",
        language: "Python",
        meta: { type: 'sort', dataKey: 'arr' },
        code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)
        print(f"Visiting {node}")

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Simple graph representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['C']
}

# Start BFS from node A
arr = bfs(graph, 'A')
`
    }
];

export const CHALLENGES_BY_LANGUAGE: Record<Language, Difficulty[]> = {
    Python: [
        {
            name: "Beginner",
            examples: [
                { title: "Variable Assignment", code: "x = 10\ny = 'Hello'\nprint(x, y)" },
                { title: "Simple Arithmetic", code: "a = 5\nb = 3\nresult = a + b * 2\nprint(result)" },
                { title: "String Concatenation", code: "first_name = 'Ada'\nlast_name = 'Lovelace'\nfull_name = first_name + ' ' + last_name\nprint(full_name)" },
                { title: "Basic List", code: "numbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)" },
                { title: "Access List Item", code: "fruits = ['apple', 'banana', 'cherry']\nfavorite = fruits[1]\nprint(favorite)" },
                { title: "Simple Dictionary", code: "person = {'name': 'John', 'age': 30}\nprint(person['name'])" },
                { title: "Update Dictionary", code: "config = {'theme': 'dark'}\nconfig['theme'] = 'light'\nprint(config)" },
                { title: "Boolean Logic", code: "is_active = True\nhas_permission = False\ncan_access = is_active and not has_permission\nprint(can_access)" },
                { title: "Variable Swap", code: "a = 5\nb = 10\ntemp = a\na = b\nb = temp\nprint(a, b)" },
                { title: "Data Types", code: "num = 42\ntext = 'Python'\nis_true = True\nmy_list = [1]\nprint(num, text, is_true)" },
                { title: "Simulated User Input", code: "user_name = 'world' # Simulating input()\nprint(f'Hello, {user_name}')" },
                { title: "Basic If Statement", code: "age = 18\nif age >= 18:\n  print('Adult')" },
                { title: "Check Data Type", code: "value = 100\nprint(type(value))" }
            ]
        },
        {
            name: "Intermediate",
            examples: [
                { title: "If-Else Condition", code: "temperature = 25\nif temperature > 30:\n    print('It is hot')\nelse:\n    print('It is not hot')" },
                { title: "For Loop", code: "total = 0\nfor i in range(5):\n    total = total + i\nprint(total)" },
                { title: "While Loop", code: "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint('Blast off!')" },
                { title: "Function Definition", code: "def greet(name):\n    message = 'Hello, ' + name\n    return message\n\ngreeting = greet('World')\nprint(greeting)" },
                { title: "Loop with Break", code: "for i in range(10):\n    if i == 5:\n        break\n    print(i)" },
                { title: "List Iteration", code: "items = ['A', 'B', 'C']\nfor item in items:\n    print('Processing ' + item)" },
                { title: "Dictionary Iteration", code: "grades = {'Math': 90, 'Science': 85}\nfor subject, grade in grades.items():\n    print(f'{subject}: {grade}')" },
                { title: "String Slicing", code: "text = 'Programming'\nlang = text[0:7]\nprint(lang)" },
                { title: "Function with Default Arg", code: "def power(base, exp=2):\n    return base ** exp\n\nsquare = power(3)\ncube = power(3, 3)\nprint(square, cube)" },
                { title: "File Read (Simulated)", code: "file_content = 'line 1\\nline 2'\nlines = file_content.split('\\n')\nfor line in lines:\n    print(line.upper())" },
                { title: "List Slicing", code: "letters = ['a', 'b', 'c', 'd', 'e']\nmiddle = letters[1:4]\nprint(middle)" },
                { title: "Set Operations", code: "set_a = {1, 2, 3}\nset_b = {3, 4, 5}\nunion = set_a | set_b\nprint(sorted(list(union)))" },
                { title: "Tuple Unpacking", code: "point = (10, 20)\nx, y = point\nprint(f'x={x}, y={y}')" }
            ]
        },
        {
            name: "Advanced",
            examples: [
                { title: "Simple Class", code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog('Rex')\nprint(my_dog.name)" },
                { title: "Class with Method", code: "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nc = Circle(5)\nprint(c.area())" },
                { title: "Recursion: Factorial", code: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)\n\nresult = factorial(4)\nprint(result)" },
                { title: "List Comprehension", code: "numbers = [1, 2, 3, 4, 5]\nsquares = [n*n for n in numbers if n % 2 == 0]\nprint(squares)" },
                { title: "Dictionary Comprehension", code: "keys = ['a', 'b', 'c']\nvalues = [1, 2, 3]\nmy_dict = {k: v for k, v in zip(keys, values)}\nprint(my_dict)" },
                { title: "Lambda Function", code: "points = [(1, 2), (4, 1), (3, 5)]\npoints.sort(key=lambda p: p[1])\nprint(points)" },
                { title: "Inheritance", code: "class Animal:\n    def speak(self):\n        return '...'\n\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow'\n\nfluffy = Cat()\nprint(fluffy.speak())" },
                { title: "Try-Except Block", code: "result = None\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    result = 'Error'\nprint(result)" },
                { title: "Nested Data Structures", code: "data = {'users': [{'name': 'A', 'id': 1}, {'name': 'B', 'id': 2}]}\nuser_name = data['users'][1]['name']\nprint(user_name)" },
                { title: "Generators", code: "def countdown(num):\n    while num > 0:\n        yield num\n        num -= 1\n\nfor i in countdown(3):\n    print(i)" },
                { title: "Simple Decorator", code: "def my_decorator(func):\n  def wrapper():\n    print('Start')\n    func()\n    print('End')\n  return wrapper\n\n@my_decorator\ndef say_hello():\n  print('Hello!')\n\nsay_hello()" },
                { title: "Context Manager", code: "class FileManager:\n  def __enter__(self):\n    print('File opened')\n    return self\n  def __exit__(self, a, b, c):\n    print('File closed')\n\nwith FileManager() as f:\n  print('Writing...')" }
            ]
        }
    ],
    JavaScript: [
        {
            name: "Beginner",
            examples: [
                { title: "Variable Declaration", code: "let x = 10;\nconst y = 'Hello';\nconsole.log(x, y);" },
                { title: "Arithmetic Operations", code: "let a = 10;\nlet b = 4;\nlet result = a * 2 + b / 2;\nconsole.log(result);" },
                { title: "String Interpolation", code: "const name = 'Alex';\nconst age = 28;\nconst message = `User ${name} is ${age} years old.`;\nconsole.log(message);" },
                { title: "Basic Array", code: "let colors = ['red', 'green'];\ncolors.push('blue');\nconsole.log(colors);" },
                { title: "Access Array Element", code: "const numbers = [10, 20, 30];\nconst second = numbers[1];\nconsole.log(second);" },
                { title: "Simple Object", code: "const user = { id: 1, status: 'active' };\nconsole.log(user.status);" },
                { title: "Update Object Property", code: "let settings = { theme: 'dark' };\nsettings.theme = 'light';\nconsole.log(settings.theme);" },
                { title: "Logical Operators", code: "const isOnline = true;\nconst hasCredits = true;\nconst canPost = isOnline && hasCredits;\nconsole.log(canPost);" },
                { title: "Ternary Operator", code: "let score = 75;\nlet grade = score > 50 ? 'Pass' : 'Fail';\nconsole.log(grade);" },
                { title: "Type Coercion", code: "const val1 = 5;\nconst val2 = '5';\nconst result = val1 + val2;\nconsole.log(result);" },
                { title: "Null vs Undefined", code: "let a = null;\nlet b;\nconsole.log(a);\nconsole.log(b);" },
                { title: "Comparison Operators", code: "const val1 = 10;\nconst val2 = '10';\nconsole.log(val1 == val2);\nconsole.log(val1 === val2);" },
                { title: "Simulated Input", code: "const input = 'Alice'; // Simulating prompt()\nconsole.log('Hello, ' + input);" }
            ]
        },
        {
            name: "Intermediate",
            examples: [
                { title: "If-Else Statement", code: "let hour = 14;\nif (hour < 12) {\n  console.log('Good morning');\n} else {\n  console.log('Good afternoon');\n}" },
                { title: "For Loop", code: "let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;\n}\nconsole.log(sum);" },
                { title: "While Loop", code: "let i = 0;\nwhile (i < 3) {\n  console.log(`Count: ${i}`);\n  i++;\n}" },
                { title: "Arrow Function", code: "const add = (a, b) => {\n  return a + b;\n};\nconst total = add(5, 3);\nconsole.log(total);" },
                { title: "Array Map Method", code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);" },
                { title: "Array Filter Method", code: "const ages = [15, 20, 25, 30];\nconst adults = ages.filter(age => age >= 18);\nconsole.log(adults);" },
                { title: "Object Destructuring", code: "const person = { name: 'Jane', age: 32 };\nconst { name } = person;\nconsole.log(name);" },
                { title: "Spread Operator", code: "const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\nconsole.log(arr2);" },
                { title: "For...of Loop", code: "const fruits = ['apple', 'banana'];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}" },
                { title: "Simulated Fetch (Promise)", code: "const fetchData = new Promise(resolve => {\n  setTimeout(() => resolve('Data loaded'), 50);\n});\nfetchData.then(res => console.log(res));" },
                { title: "Array find Method", code: "const users = [{id:1, name:'A'}, {id:2, name:'B'}]\nconst userB = users.find(u => u.name === 'B');\nconsole.log(userB.id);" },
                { title: "Object.keys", code: "const data = {a:1, b:2};\nconst keys = Object.keys(data);\nconsole.log(keys);" },
                { title: "setTimeout", code: "console.log('Start');\nsetTimeout(() => {\n  console.log('Middle');\n}, 50);\nconsole.log('End');" }
            ]
        },
        {
            name: "Advanced",
            examples: [
                { title: "Simple Class", code: "class User {\n  constructor(name) {\n    this.name = name;\n  }\n}\nconst player = new User('Chris');\nconsole.log(player.name);" },
                { title: "Class with Method", code: "class Rectangle {\n  constructor(w, h) {\n    this.width = w;\n    this.height = h;\n  }\n  getArea() {\n    return this.width * this.height;\n  }\n}\nconst rect = new Rectangle(10, 5);\nconsole.log(rect.getArea());" },
                { title: "Async/Await", code: "async function getData() {\n  const result = await Promise.resolve('Success');\n  console.log(result);\n}\ngetData();" },
                { title: "Array Reduce", code: "const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, cur) => acc + cur, 0);\nconsole.log(sum);" },
                { title: "Closure Example", code: "function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());" },
                { title: "Object Property Shorthand", code: "const name = 'Siti';\nconst age = 40;\nconst user = { name, age };\nconsole.log(user);" },
                { title: "Class Inheritance", code: "class Vehicle { constructor() { this.type = 'vehicle'; } }\nclass Car extends Vehicle { constructor() { super(); this.wheels = 4; } }\nconst myCar = new Car();\nconsole.log(myCar.type);" },
                { title: "Try-Catch Block", code: "let result;\ntry {\n  result = nonExistentVar;\n} catch (error) {\n  result = 'Caught error!';\n}\nconsole.log(result);" },
                { title: "Set Data Structure", code: "const letters = new Set(['a', 'b', 'a']);\nletters.add('c');\nconsole.log(letters.size);" },
                { title: "Map Data Structure", code: "const userRoles = new Map();\nuserRoles.set('admin', 1);\nuserRoles.set('guest', 2);\nconsole.log(userRoles.get('admin'));" },
                { title: "Generators", code: "function* idMaker(){\n  let index = 0;\n  while(true) yield index++;\n}\nconst gen = idMaker();\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);" },
                { title: "Promise.all", code: "const p1 = Promise.resolve(1);\nconst p2 = 2;\nPromise.all([p1, p2]).then((values) => {\n  console.log(values[0] + values[1]);\n});" },
                { title: "Optional Chaining", code: "const user = { profile: { name: 'Dev' } };\nconst street = user.profile?.address?.street;\nconsole.log(street);" }
            ]
        }
    ],
    Java: [
        {
            name: "Beginner",
            examples: [
                { title: "Hello World", code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, Java!\");\n  }\n}" },
                { title: "Variable Declaration", code: "public class Main {\n  public static void main(String[] args) {\n    int x = 10;\n    String y = \"World\";\n    System.out.println(y);\n  }\n}" },
                { title: "Basic Arithmetic", code: "public class Main {\n  public static void main(String[] args) {\n    int a = 20;\n    int b = 5;\n    int result = a / b;\n    System.out.println(result);\n  }\n}" },
                { title: "String Concatenation", code: "public class Main {\n  public static void main(String[] args) {\n    String part1 = \"Java\";\n    String part2 = \" is cool\";\n    String full = part1 + part2;\n    System.out.println(full);\n  }\n}" },
                { title: "Basic Array", code: "public class Main {\n  public static void main(String[] args) {\n    int[] numbers = {10, 20, 30};\n    System.out.println(numbers[0]);\n  }\n}" },
                { title: "Update Array Element", code: "public class Main {\n  public static void main(String[] args) {\n    String[] fruits = {\"Apple\", \"Banana\"};\n    fruits[1] = \"Cherry\";\n    System.out.println(fruits[1]);\n  }\n}" },
                { title: "Boolean Variable", code: "public class Main {\n  public static void main(String[] args) {\n    boolean isRaining = false;\n    if (!isRaining) {\n        System.out.println(\"It's sunny\");\n    }\n  }\n}" },
                { title: "Casting Types", code: "public class Main {\n  public static void main(String[] args) {\n    double myDouble = 9.78;\n    int myInt = (int) myDouble;\n    System.out.println(myInt);\n  }\n}" },
                { title: "Final Variable", code: "public class Main {\n  public static void main(String[] args) {\n    final double PI = 3.14;\n    // PI = 4; This would cause an error\n    System.out.println(PI);\n  }\n}" },
                { title: "Character Type", code: "public class Main {\n  public static void main(String[] args) {\n    char grade = 'A';\n    System.out.println(\"Your grade is \" + grade);\n  }\n}" },
                { title: "Simulated Input", code: "public class Main {\n  public static void main(String[] args) {\n    int age = 25; // Simulated input\n    System.out.println(\"Age: \" + age);\n  }\n}" },
                { title: "Increment Operator", code: "public class Main {\n  public static void main(String[] args) {\n    int count = 5;\n    count++;\n    System.out.println(count);\n  }\n}" },
                { title: "Logical Operators", code: "public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    boolean result = x > 3 && x < 10;\n    System.out.println(result);\n  }\n}" }
            ]
        },
        {
            name: "Intermediate",
            examples: [
                { title: "If-Else Statement", code: "public class Main {\n  public static void main(String[] args) {\n    int time = 20;\n    if (time < 18) {\n      System.out.println(\"Good day.\");\n    } else {\n      System.out.println(\"Good evening.\");\n    }\n  }\n}" },
                { title: "For Loop", code: "public class Main {\n  public static void main(String[] args) {\n    for (int i = 0; i < 3; i++) {\n      System.out.println(i);\n    }\n  }\n}" },
                { title: "While Loop", code: "public class Main {\n  public static void main(String[] args) {\n    int i = 0;\n    while (i < 3) {\n      System.out.println(i);\n      i++;\n    }\n  }\n}" },
                { title: "Static Method", code: "public class Main {\n  static void myMethod() {\n    System.out.println(\"Method called\");\n  }\n  public static void main(String[] args) {\n    myMethod();\n  }\n}" },
                { title: "Method with Parameters", code: "public class Main {\n  static int sum(int a, int b) {\n    return a + b;\n  }\n  public static void main(String[] args) {\n    int result = sum(5, 3);\n    System.out.println(result);\n  }\n}" },
                { title: "Enhanced For Loop", code: "public class Main {\n  public static void main(String[] args) {\n    String[] cars = {\"Volvo\", \"BMW\"};\n    for (String car : cars) {\n      System.out.println(car);\n    }\n  }\n}" },
                { title: "Switch Statement", code: "public class Main {\n  public static void main(String[] args) {\n    int day = 4;\n    switch (day) {\n      case 4:\n        System.out.println(\"Thursday\");\n        break;\n      default:\n        System.out.println(\"Other day\");\n    }\n  }\n}" },
                { title: "String Length", code: "public class Main {\n  public static void main(String[] args) {\n    String txt = \"ABCDEFG\";\n    System.out.println(txt.length());\n  }\n}" },
                { title: "Math.max Function", code: "public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    int y = 10;\n    int max = Math.max(x, y);\n    System.out.println(max);\n  }\n}" },
                { title: "Break in Loop", code: "public class Main {\n  public static void main(String[] args) {\n    for (int i = 0; i < 10; i++) {\n      if (i == 4) {\n        break;\n      }\n      System.out.println(i);\n    }\n  }\n}" },
                { title: "Method Overloading", code: "public class Main {\n  static int plusMethod(int x, int y) { return x + y; }\n  static double plusMethod(double x, double y) { return x + y; }\n  public static void main(String[] args) {\n    System.out.println(plusMethod(8, 5));\n  }\n}" },
                { title: "StringBuilder", code: "public class Main {\n  public static void main(String[] args) {\n    StringBuilder sb = new StringBuilder();\n    sb.append(\"Hello\");\n    sb.append(\" World\");\n    System.out.println(sb.toString());\n  }\n}" },
                { title: "Do-While Loop", code: "public class Main {\n  public static void main(String[] args) {\n    int i = 0;\n    do {\n      System.out.println(i);\n      i++;\n    } while (i < 3);\n  }\n}" }
            ]
        },
        {
            name: "Advanced",
            examples: [
                { title: "Simple Class", code: "class Car {\n  String color = \"red\";\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Car myCar = new Car();\n    System.out.println(myCar.color);\n  }\n}" },
                { title: "Class with Constructor", code: "class Person {\n  String name;\n  Person(String n) {\n    name = n;\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person(\"David\");\n    System.out.println(p.name);\n  }\n}" },
                { title: "Class Method", code: "class Calculator {\n  public int add(int a, int b) {\n    return a + b;\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Calculator calc = new Calculator();\n    int result = calc.add(10, 20);\n    System.out.println(result);\n  }\n}" },
                { title: "ArrayList", code: "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> items = new ArrayList<>();\n    items.add(\"Book\");\n    items.add(\"Pen\");\n    System.out.println(items.get(0));\n  }\n}" },
                { title: "HashMap", code: "import java.util.HashMap;\npublic class Main {\n  public static void main(String[] args) {\n    HashMap<String, Integer> map = new HashMap<>();\n    map.put(\"A\", 1);\n    map.put(\"B\", 2);\n    System.out.println(map.get(\"B\"));\n  }\n}" },
                { title: "Inheritance", code: "class Vehicle { protected String brand = \"Ford\"; }\nclass Car extends Vehicle { private String model = \"Mustang\"; }\npublic class Main {\n  public static void main(String[] args) {\n    Car myCar = new Car();\n    System.out.println(myCar.brand);\n  }\n}" },
                { title: "Try-Catch Block", code: "public class Main {\n  public static void main(String[] args) {\n    try {\n      int[] myNumbers = {1, 2, 3};\n      System.out.println(myNumbers[10]);\n    } catch (Exception e) {\n      System.out.println(\"Error.\");\n    }\n  }\n}" },
                { title: "Recursion: Factorial", code: "public class Main {\n  public static void main(String[] args) {\n    int result = factorial(4);\n    System.out.println(result);\n  }\n  public static int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n  }\n}" },
                { title: "Encapsulation (Get/Set)", code: "class Account {\n  private double balance;\n  public void setBalance(double b) { this.balance = b; }\n  public double getBalance() { return balance; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Account acc = new Account();\n    acc.setBalance(100.50);\n    System.out.println(acc.getBalance());\n  }\n}" },
                { title: "Lambda Expression", code: "import java.util.ArrayList;\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Integer> n = new ArrayList<>();\n    n.add(5); n.add(9);\n    n.forEach((num) -> { System.out.println(num); });\n  }\n}" },
                { title: "Interface", code: "interface Animal { public void sound(); }\nclass Pig implements Animal {\n  public void sound() { System.out.println(\"Oink\"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    new Pig().sound();\n  }\n}" },
                { title: "Abstract Class", code: "abstract class Shape { abstract double area(); }\nclass Square extends Shape {\n  double side = 4;\n  double area() { return side*side; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(new Square().area());\n  }\n}" }
            ]
        }
    ],
    C: [
        {
            name: "Beginner",
            examples: [
                { title: "Hello World", code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, C!\");\n    return 0;\n}" },
                { title: "Integer Variable", code: "#include <stdio.h>\n\nint main() {\n    int myNum = 15;\n    printf(\"%d\", myNum);\n    return 0;\n}" },
                { title: "Simple Calculation", code: "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int y = 2;\n    int sum = x + y;\n    printf(\"%d\", sum);\n    return 0;\n}" },
                { title: "Character Variable", code: "#include <stdio.h>\n\nint main() {\n    char myGrade = 'B';\n    printf(\"%c\", myGrade);\n    return 0;\n}" },
                { title: "Basic Array", code: "#include <stdio.h>\n\nint main() {\n    int myNumbers[] = {25, 50, 75};\n    printf(\"%d\", myNumbers[0]);\n    return 0;\n}" },
                { title: "Change Array Element", code: "#include <stdio.h>\n\nint main() {\n    int nums[] = {10, 20};\n    nums[0] = 5;\n    printf(\"%d\", nums[0]);\n    return 0;\n}" },
                { title: "Constants", code: "#include <stdio.h>\n\nint main() {\n    const int BIRTH_YEAR = 2000;\n    printf(\"%d\", BIRTH_YEAR);\n    return 0;\n}" },
                { title: "Float and Double", code: "#include <stdio.h>\n\nint main() {\n    float temp = 36.5;\n    printf(\"Temp: %f\", temp);\n    return 0;\n}" },
                { title: "Get User Input (Simulated)", code: "#include <stdio.h>\n\nint main() {\n    int num = 123; // Simulated input\n    printf(\"You entered: %d\", num);\n    return 0;\n}" },
                { title: "Sizeof Operator", code: "#include <stdio.h>\n\nint main() {\n    int myInt;\n    printf(\"%lu\", sizeof(myInt));\n    return 0;\n}" },
                { title: "#define Constant", code: "#include <stdio.h>\n#define PI 3.14159\n\nint main() {\n    printf(\"Pi is %f\", PI);\n    return 0;\n}" },
                { title: "Modulo Operator", code: "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int remainder = x % 3;\n    printf(\"%d\", remainder);\n    return 0;\n}" },
                { title: "Comments", code: "#include <stdio.h>\n\nint main() {\n    // This is a comment\n    int x = 5; /* Multi-line */\n    printf(\"%d\", x);\n    return 0;\n}" }
            ]
        },
        {
            name: "Intermediate",
            examples: [
                { title: "If-Else", code: "#include <stdio.h>\n\nint main() {\n    int x = 20;\n    if (x > 18) {\n        printf(\"Adult\");\n    } else {\n        printf(\"Minor\");\n    }\n    return 0;\n}" },
                { title: "For Loop", code: "#include <stdio.h>\n\nint main() {\n    int i;\n    for (i = 0; i < 3; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}" },
                { title: "While Loop", code: "#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while (i < 3) {\n        printf(\"%d\\n\", i);\n        i++;\n    }\n    return 0;\n}" },
                { title: "Function Declaration", code: "#include <stdio.h>\n\nvoid myFunction() {\n    printf(\"I just got executed!\");\n}\n\nint main() {\n    myFunction();\n    return 0;\n}" },
                { title: "Function with Parameter", code: "#include <stdio.h>\n\nvoid printNum(int num) {\n    printf(\"Number is: %d\", num);\n}\n\nint main() {\n    printNum(10);\n    return 0;\n}" },
                { title: "Pointers", code: "#include <stdio.h>\n\nint main() {\n    int myAge = 43;\n    int* ptr = &myAge;\n    printf(\"%d\", *ptr);\n    return 0;\n}" },
                { title: "Dereferencing Pointer", code: "#include <stdio.h>\n\nint main() {\n    int num = 10;\n    int* p = &num;\n    *p = 20;\n    printf(\"%d\", num);\n    return 0;\n}" },
                { title: "String as Char Array", code: "#include <stdio.h>\n\nint main() {\n    char greeting[] = \"Hello\";\n    printf(\"%s\", greeting);\n    return 0;\n}" },
                { title: "Loop through an Array", code: "#include <stdio.h>\n\nint main() {\n    int myNumbers[] = {25, 50, 75};\n    int i;\n    for (i = 0; i < 3; i++) {\n        printf(\"%d\\n\", myNumbers[i]);\n    }\n    return 0;\n}" },
                { title: "Switch Statement", code: "#include <stdio.h>\n\nint main() {\n    int day = 4;\n    switch (day) {\n        case 4:\n            printf(\"Thursday\");\n            break;\n    }\n    return 0;\n}" },
                { title: "String Library", code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[50] = \"Hello\";\n    strcat(str, \" World\");\n    printf(\"%s\", str);\n    return 0;\n}" },
                { title: "Pass Array to Function", code: "#include <stdio.h>\n\nvoid printFirst(int arr[]) {\n    printf(\"%d\", arr[0]);\n}\n\nint main() {\n    int nums[] = {10, 20};\n    printFirst(nums);\n    return 0;\n}" },
                { title: "Address-of Operator", code: "#include <stdio.h>\n\nint main() {\n    int myAge = 43;\n    printf(\"%p\", &myAge);\n    return 0;\n}" }
            ]
        },
        {
            name: "Advanced",
            examples: [
                { title: "Simple Struct", code: "#include <stdio.h>\n\nstruct Person {\n    int age;\n    char initial;\n};\n\nint main() {\n    struct Person p1;\n    p1.age = 30;\n    printf(\"%d\", p1.age);\n    return 0;\n}" },
                { title: "Access Struct Members", code: "#include <stdio.h>\n\nstruct Car {\n  char brand[50];\n  int year;\n};\n\nint main() {\n  struct Car c1 = {\"BMW\", 2022};\n  printf(\"%s\", c1.brand);\n  return 0;\n}" },
                { title: "Recursion: Factorial", code: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int result = factorial(4);\n    printf(\"%d\", result);\n    return 0;\n}" },
                { title: "Pointers and Functions", code: "#include <stdio.h>\n\nvoid addFive(int *n) {\n    *n = *n + 5;\n}\n\nint main() {\n    int num = 10;\n    addFive(&num);\n    printf(\"%d\", num);\n    return 0;\n}" },
                { title: "Dynamic Memory (malloc)", code: "#include <stdlib.h>\n#include <stdio.h>\n\nint main() {\n    int *arr;\n    arr = (int*) malloc(2 * sizeof(int));\n    arr[0] = 10;\n    printf(\"%d\", arr[0]);\n    free(arr);\n    return 0;\n}" },
                { title: "String Functions (strcpy)", code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n   char str1[10] = \"Hello\";\n   char str2[10];\n   strcpy(str2, str1);\n   printf(\"%s\", str2);\n   return 0;\n}" },
                { title: "File Write (Simulated)", code: "#include <stdio.h>\n\nint main() {\n    // FILE *fptr = fopen(\"f.txt\", \"w\");\n    // fprintf(fptr, \"Hi\");\n    // fclose(fptr);\n    printf(\"File write simulated.\");\n    return 0;\n}" },
                { title: "Enums", code: "#include <stdio.h>\n\nenum Level { LOW, MEDIUM, HIGH };\n\nint main() {\n    enum Level myVar = MEDIUM;\n    printf(\"%d\", myVar);\n    return 0;\n}" },
                { title: "2D Arrays", code: "#include <stdio.h>\n\nint main() {\n    int matrix[2][3] = {{1, 4, 2}, {3, 6, 8}};\n    printf(\"%d\", matrix[0][1]);\n    return 0;\n}" },
                { title: "Typedef", code: "#include <stdio.h>\n\ntypedef struct {\n    int x; int y;\n} Point;\n\nint main() {\n    Point p1;\n    p1.x = 10;\n    printf(\"%d\", p1.x);\n    return 0;\n}" },
                { title: "Union Data Structure", code: "#include <stdio.h>\n\nunion Data { int i; float f; };\n\nint main() {\n    union Data data;\n    data.i = 10;\n    data.f = 220.5;\n    printf(\"i: %d\", data.i);\n    return 0;\n}" },
                { title: "Function Pointers", code: "#include <stdio.h>\n\nvoid sayHello() { printf(\"Hello\"); }\n\nint main() {\n    void (*func_ptr)() = &sayHello;\n    (*func_ptr)();\n    return 0;\n}" },
                { title: "Bitwise Operators", code: "#include <stdio.h>\n\nint main() {\n    unsigned int a = 60; \n    unsigned int b = 13; \n    int c = a & b;\n    printf(\"%d\", c);\n    return 0;\n}" }
            ]
        }
    ],
    'C#': [
        {
            name: "Beginner",
            examples: [
                { title: "Hello World", code: "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, C#!\");\n    }\n}" },
                { title: "Variable Declaration", code: "using System;\n\nclass Program {\n    static void Main() {\n        int myNum = 15;\n        Console.WriteLine(myNum);\n    }\n}" },
                { title: "String Variable", code: "using System;\n\nclass Program {\n    static void Main() {\n        string name = \"John\";\n        Console.WriteLine(\"Hello \" + name);\n    }\n}" },
                { title: "Constants", code: "using System;\n\nclass Program {\n    static void Main() {\n        const double PI = 3.14;\n        Console.WriteLine(PI);\n    }\n}" },
                { title: "Type Casting", code: "using System;\n\nclass Program {\n    static void Main() {\n        double myDouble = 9.78;\n        int myInt = (int) myDouble;\n        Console.WriteLine(myInt);\n    }\n}" },
                { title: "String Interpolation", code: "using System;\n\nclass Program {\n    static void Main() {\n        string name = \"Maria\";\n        Console.WriteLine($\"My name is {name}\");\n    }\n}" },
                { title: "Boolean Logic", code: "using System;\n\nclass Program {\n    static void Main() {\n        bool isCSharpFun = true;\n        Console.WriteLine(isCSharpFun);\n    }\n}" },
                { title: "Basic Array", code: "using System;\n\nclass Program {\n    static void Main() {\n        string[] cars = {\"Volvo\", \"BMW\"};\n        Console.WriteLine(cars[0]);\n    }\n}" },
                { title: "Array Length", code: "using System;\n\nclass Program {\n    static void Main() {\n        int[] numbers = {1, 2, 3, 4};\n        Console.WriteLine(numbers.Length);\n    }\n}" },
                { title: "User Input (Simulated)", code: "using System;\n\nclass Program {\n    static void Main() {\n        string userName = \"Test\"; //Simulated input\n        Console.WriteLine(\"Username is: \" + userName);\n    }\n}" },
                { title: "var Keyword", code: "using System;\n\nclass Program {\n    static void Main() {\n        var message = \"Hello\";\n        Console.WriteLine(message);\n    }\n}" },
                { title: "Math Class", code: "using System;\n\nclass Program {\n    static void Main() {\n        int max = Math.Max(5, 10);\n        Console.WriteLine(max);\n    }\n}" },
                { title: "String Length", code: "using System;\n\nclass Program {\n    static void Main() {\n        string txt = \"ABCDEFG\";\n        Console.WriteLine(txt.Length);\n    }\n}" }
            ]
        },
        {
            name: "Intermediate",
            examples: [
                { title: "If-Else", code: "using System;\n\nclass Program {\n    static void Main() {\n        int x = 10;\n        if (x > 5) {\n            Console.WriteLine(\"Greater\");\n        } else {\n            Console.WriteLine(\"Smaller\");\n        }\n    }\n}" },
                { title: "For Loop", code: "using System;\n\nclass Program {\n    static void Main() {\n        for (int i = 0; i < 3; i++) {\n            Console.WriteLine(i);\n        }\n    }\n}" },
                { title: "While Loop", code: "using System;\n\nclass Program {\n    static void Main() {\n        int i = 0;\n        while (i < 3) {\n            Console.WriteLine(i);\n            i++;\n        }\n    }\n}" },
                { title: "Foreach Loop", code: "using System;\n\nclass Program {\n    static void Main() {\n        string[] cars = {\"Volvo\", \"BMW\"};\n        foreach (string car in cars) {\n            Console.WriteLine(car);\n        }\n    }\n}" },
                { title: "Method Definition", code: "using System;\n\nclass Program {\n    static void MyMethod() {\n        Console.WriteLine(\"Executed\");\n    }\n    static void Main() {\n        MyMethod();\n    }\n}" },
                { title: "Method with Parameter", code: "using System;\n\nclass Program {\n    static void PrintName(string name) {\n        Console.WriteLine(\"Name: \" + name);\n    }\n    static void Main() {\n        PrintName(\"Liam\");\n    }\n}" },
                { title: "Method Return Value", code: "using System;\n\nclass Program {\n    static int Sum(int x, int y) {\n        return x + y;\n    }\n    static void Main() {\n        int result = Sum(5, 3);\n        Console.WriteLine(result);\n    }\n}" },
                { title: "Switch Statement", code: "using System;\n\nclass Program {\n    static void Main() {\n        int day = 2;\n        switch(day) {\n            case 2:\n                Console.WriteLine(\"Tuesday\");\n                break;\n        }\n    }\n}" },
                { title: "Ternary Operator", code: "using System;\n\nclass Program {\n    static void Main() {\n        int time = 20;\n        string result = (time < 18) ? \"Good day.\" : \"Good evening.\";\n        Console.WriteLine(result);\n    }\n}" },
                { title: "Break in Loop", code: "using System;\n\nclass Program {\n    static void Main() {\n        for (int i = 0; i < 10; i++) {\n            if (i == 4) break;\n            Console.WriteLine(i);\n        }\n    }\n}" },
                { title: "Null-coalescing", code: "using System;\n\nclass Program {\n    static void Main() {\n        string name = null;\n        string displayName = name ?? \"Guest\";\n        Console.WriteLine(displayName);\n    }\n}" },
                { title: "String Formatting", code: "using System;\n\nclass Program {\n    static void Main() {\n        double price = 19.99;\n        string output = String.Format(\"Price: {0:C}\", price);\n        Console.WriteLine(output);\n    }\n}" },
                { title: "Do-While Loop", code: "using System;\n\nclass Program {\n    static void Main() {\n        int i = 0;\n        do {\n            Console.WriteLine(i);\n            i++;\n        } while (i < 3);\n    }\n}" }
            ]
        },
        {
            name: "Advanced",
            examples: [
                { title: "Simple Class", code: "using System;\n\nclass Car {\n    public string color = \"red\";\n}\n\nclass Program {\n    static void Main() {\n        Car myCar = new Car();\n        Console.WriteLine(myCar.color);\n    }\n}" },
                { title: "Class with Constructor", code: "using System;\n\nclass Person {\n    public string name;\n    public Person(string n) {\n        name = n;\n    }\n}\n\nclass Program {\n    static void Main() {\n        Person p = new Person(\"Zoe\");\n        Console.WriteLine(p.name);\n    }\n}" },
                { title: "Properties (Get/Set)", code: "using System;\n\nclass User {\n    public string Name { get; set; }\n}\n\nclass Program {\n    static void Main() {\n        User u = new User();\n        u.Name = \"Alex\";\n        Console.WriteLine(u.Name);\n    }\n}" },
                { title: "List<T>", code: "using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void Main() {\n        List<string> languages = new List<string>();\n        languages.Add(\"C#\");\n        Console.WriteLine(languages[0]);\n    }\n}" },
                { title: "Dictionary", code: "using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void Main() {\n        Dictionary<string, int> ages = new Dictionary<string, int>();\n        ages.Add(\"Bob\", 30);\n        Console.WriteLine(ages[\"Bob\"]);\n    }\n}" },
                { title: "Inheritance", code: "using System;\n\nclass Vehicle {}\nclass Car : Vehicle {\n    public string modelName = \"Mustang\";\n}\n\nclass Program {\n    static void Main() {\n        Car myCar = new Car();\n        Console.WriteLine(myCar.modelName);\n    }\n}" },
                { title: "Try-Catch", code: "using System;\n\nclass Program {\n    static void Main() {\n        try {\n            int[] myNumbers = {1, 2, 3};\n            Console.WriteLine(myNumbers[10]);\n        } catch (Exception) {\n            Console.WriteLine(\"Error occurred.\");\n        }\n    }\n}" },
                { title: "Enum", code: "using System;\n\nenum Level { Low, Medium, High }\n\nclass Program {\n    static void Main() {\n        Level myVar = Level.Medium;\n        Console.WriteLine(myVar);\n    }\n}" },
                { title: "LINQ Query (Simulated)", code: "using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void Main() {\n        List<int> n = new List<int> { 1, 2, 3, 4, 5 };\n        int count = 0;\n        foreach (int num in n) { if(num > 3) count++; }\n        Console.WriteLine(count);\n    }\n}" },
                { title: "Static Class", code: "using System;\n\npublic static class Converter {\n    public static double ToFahrenheit(double c) {\n        return (c * 9 / 5) + 32;\n    }\n}\nclass Program {\n    static void Main() {\n        double f = Converter.ToFahrenheit(20);\n        Console.WriteLine(f);\n    }\n}" },
                { title: "Interface", code: "using System;\n\ninterface IAnimal { void AnimalSound(); }\nclass Pig : IAnimal {\n    public void AnimalSound() { Console.WriteLine(\"Oink\"); }\n}\nclass Program {\n    static void Main() { new Pig().AnimalSound(); }\n}" },
                { title: "Delegates", code: "using System;\n\ndelegate void MyDelegate(string msg);\n\nclass Program {\n    static void MethodA(string m) { Console.WriteLine(m); }\n    static void Main() {\n        MyDelegate handler = MethodA;\n        handler(\"Hello Delegate\");\n    }\n}" }
            ]
        }
    ],
    Ruby: [
        {
            name: "Beginner",
            examples: [
                { title: "Puts Statement", code: "puts \"Hello, Ruby!\"" },
                { title: "Local Variables", code: "x = 10\nmessage = \"Hi\"\nputs x\nputs message" },
                { title: "Simple Math", code: "a = 5\nb = 3\nresult = a * (b + 2)\nputs result" },
                { title: "String Interpolation", code: "name = \"Alice\"\nputs \"Welcome, #{name}!\"" },
                { title: "Basic Array", code: "items = [1, \"two\", 3.0]\nitems << 4\nputs items[1]" },
                { title: "Access Array Element", code: "fruits = [\"apple\", \"banana\"]\nfirst_fruit = fruits.first\nputs first_fruit" },
                { title: "Simple Hash", code: "person = { 'name' => 'Bob', 'age' => 25 }\nputs person['name']" },
                { title: "Symbols as Hash Keys", code: "config = { theme: 'dark', font_size: 16 }\nconfig[:font_size] = 18\nputs config[:font_size]" },
                { title: "Boolean Values", code: "is_admin = true\ncan_edit = is_admin && true\nputs can_edit" },
                { title: "Nil Value", code: "user = nil\nputs user.nil?" },
                { title: "Simulated Input", code: "name = 'Rubyist' # Simulating gets.chomp\nputs \"Hello, #{name}\"" },
                { title: "Comparison", code: "a = 5\nb = '5'\nputs a == b.to_i" },
                { title: "Comments", code: "# This is a comment\n=begin\nMulti-line\n=end\nputs 'Done'" }
            ]
        },
        {
            name: "Intermediate",
            examples: [
                { title: "If-Else Condition", code: "score = 80\nif score > 60\n  puts \"Pass\"\nelse\n  puts \"Fail\"\nend" },
                { title: "Unless Condition", code: "is_raining = false\nunless is_raining\n  puts \"It's a sunny day!\"\nend" },
                { title: "Times Loop", code: "3.times do |i|\n  puts \"Iteration #{i}\"\nend" },
                { title: "Method Definition", code: "def greet(name)\n  return \"Hello, #{name}\"\nend\n\nmessage = greet(\"World\")\nputs message" },
                { title: "Array Iteration (.each)", code: "numbers = [1, 2, 3]\nnumbers.each do |n|\n  puts n * 2\nend" },
                { title: "Hash Iteration (.each)", code: "capitals = { usa: \"DC\", france: \"Paris\" }\ncapitals.each do |country, city|\n  puts \"#{country}: #{city}\"\nend" },
                { title: "Range and Case", code: "age = 25\ncase age\nwhen 0..17\n  puts \"Child\"\nwhen 18..64\n  puts \"Adult\"\nend" },
                { title: "String Methods", code: "text = \"ruby is fun\"\nputs text.upcase\nputs text.length" },
                { title: "While Loop", code: "counter = 0\nwhile counter < 3\n  puts counter\n  counter += 1\nend" },
                { title: "Method with Default Arg", code: "def power(base, exp = 2)\n  base ** exp\nend\n\nputs power(3)\nputs power(3, 3)" },
                { title: "Array Methods", code: "words = \"hello world ruby\"\narr = words.split(' ')\nputs arr.join('-')" },
                { title: "Blocks with Arguments", code: "[1, 2].each_with_index do |num, index|\n  puts \"Item #{num} is at index #{index}\"\nend" },
                { title: "Conditional Assignment", code: "user = nil\nuser ||= \"guest\"\nputs user" }
            ]
        },
        {
            name: "Advanced",
            examples: [
                { title: "Simple Class", code: "class User\n  def initialize(name)\n    @name = name\n  end\n  def name\n    @name\n  end\nend\n\nu = User.new(\"Charlie\")\nputs u.name" },
                { title: "Attribute Accessors", code: "class Product\n  attr_accessor :name, :price\nend\n\np = Product.new\np.name = \"Book\"\nputs p.name" },
                { title: "Class Method", code: "class MathHelper\n  def self.square(n)\n    n * n\n  end\nend\n\nputs MathHelper.square(5)" },
                { title: "Array Map", code: "nums = [1, 2, 3]\nsquares = nums.map { |n| n * n }\nputs squares.inspect" },
                { title: "Array Select", code: "numbers = [1, 2, 3, 4, 5]\nevens = numbers.select { |n| n.even? }\nputs evens.inspect" },
                { title: "Inheritance", code: "class Animal\n  def speak\n    \"...\"\n  end\nend\n\nclass Cat < Animal\n  def speak\n    \"Meow\"\n  end\nend\n\nputs Cat.new.speak" },
                { title: "Begin-Rescue Block", code: "begin\n  result = 10 / 0\nrescue ZeroDivisionError\n  result = \"Error\"\nend\nputs result" },
                { title: "Blocks and Yield", code: "def my_method\n  puts \"start\"\n  yield\n  puts \"end\"\nend\n\nmy_method { puts \"in block\" }" },
                { title: "Simple Module", code: "module Greeter\n  def self.greet\n    \"Hello from module!\"\n  end\nend\n\nputs Greeter.greet" },
                { title: "Ternary Operator", code: "is_logged_in = true\nmessage = is_logged_in ? \"Welcome\" : \"Please log in\"\nputs message" },
                { title: "Procs and Lambdas", code: "my_proc = Proc.new { |x| puts x * 2 }\n[1, 2].each(&my_proc)\n\nmy_lambda = ->(x) { puts x * 3 }\nmy_lambda.call(5)" },
                { title: "Module Mixin", code: "module Loggable\n  def log(text)\n    puts \"LOG: #{text}\"\n  end\nend\n\nclass User\n  include Loggable\nend\n\nUser.new.log(\"User created\")" },
                { title: "Splat Operator", code: "def my_method(*args)\n  puts args.length\nend\n\nmy_method(1, 2, 3)" }
            ]
        }
    ]
};