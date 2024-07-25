flashcard_data = {
'1': {
'title': 'Minimum Stack',
'number':'115',
'hint':
""" 
getMin needs to return the minimum of the stack at all times,
even as values get removed from the stack
""",
'note':
""" 
push values to both a stack && a minimum stack, keeping track of the minimum at each point in the stack (with a separate stack)

some other solutions include adding a tuple to your stack, with one value being the new number, and the other value being the minimum at this point

another solution could also be to keep a minimum stack but only ever updated when we see minimums that are you to or less than the previous minimum
and when you pop off the value evaluate if you're popping off your current minimum
""",
'problem': 
""" 
Design a stack class that supports the push, pop, top, and getMin operations.

    MinStack() initializes the stack object.
    void push(int val) pushes the element val onto the stack.
    void pop() removes the element on the top of the stack.
    int top() gets the top element of the stack.
    int getMin() retrieves the minimum element in the stack.

Each function should run in O(1)O(1) time.

Input: ["MinStack", "push", 1, "push", 2, "push", 0, "getMin", "pop", "top", "getMin"]

Output: [null,null,null,null,0,null,2,1]

Explanation:
MinStack minStack = new MinStack();
minStack.push(1);
minStack.push(2);
minStack.push(0);
minStack.getMin(); // return 0
minStack.pop();
minStack.top();    // return 2
minStack.getMin(); // return 1

"""
,
"code":
"""
class MinStack:
    def __init__(self):
        self.stack = []
        self.minStack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        val = min(val, self.minStack[-1] if self.minStack else val)
        self.minStack.append(val)

    def pop(self) -> None:
        self.stack.pop()
        self.minStack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.minStack[-1]
"""
},

'2': {
'tag': ['stack'],
'title': 'Validate Parentheses',
'note':
""" 
only add open characters to the stack, use closed characters to pop the open characters off the stack
said any point that you have a mix matched scenario ("}" trying to pop anything but a "{"), then we know it's not valid
""",
'problem': 
""" 
You are given a string s consisting of the following characters: '(', ')', '{', '}', '[' and ']'.

The input string s is valid if and only if:

    Every open bracket is closed by the same type of close bracket.
    Open brackets are closed in the correct order.
    Every close bracket has a corresponding open bracket of the same type.

Return true if s is a valid string, and false otherwise.

Example 1:

Input: s = "[]"

Output: true

Example 2:

Input: s = "([{}])"

Output: true

Example 3:

Input: s = "[(])"

Output: false

Explanation: The brackets are not closed in the correct order.

Constraints:

    1 <= s.length <= 1000

"""
,
"code":
"""
class Solution:
    def isValid(self, s: str) -> bool:
        Map = {")": "(", "]": "[", "}": "{"}
        stack = []

        for c in s:
            if c not in Map:
                stack.append(c)
                continue
            if not stack or stack[-1] != Map[c]:
                return False
            stack.pop()

        return not stack
    
"""
},

'3':{
'tag':
['stack'],
'title':
""" 
Evaluate Reverse Polish Notation
""",
'note':
""" 
you're going to add the first two numbers to the stack, and when you have found there operand, you will pop those values off, evaluate their new value (2 + 1 ---> 3), add their new value to the stack, the next number, the next operand, then pop off those two values and perform that calculation:
Input: tokens = ["1","2","+","3","*","4","-"]
s = [1, 2] ---> 1 + 2 ---> 3
s = [3, 3] ---> 3 * 3 ---> 9
s = [9, 4] ---> 9 - 4 ---> 5
""",
'problem': 
""" 
Evaluate Reverse Polish Notation

You are given an array of strings tokens that represents a valid arithmetic expression in Reverse Polish Notation.

Return the integer that represents the evaluation of the expression.

    The operands may be integers or the results of other operations.
    The operators include '+', '-', '*', and '/'.
    Assume that division between integers always truncates toward zero.

Example 1:
(there were only ever be to numbers to evaluate before the operand)
Input: tokens = ["1","2","+","3","*","4","-"]

Output: 5

Explanation: ((1 + 2) * 3) - 4 = 5

Constraints:

    1 <= tokens.length <= 1000.
    tokens[i] is "+", "-", "*", or "/", or a string representing an integer in the range [-100, 100].

""",
"code":
""" 
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for c in tokens:
            if c == "+":
                stack.append(stack.pop() + stack.pop())
            elif c == "-":
                a, b = stack.pop(), stack.pop()
                stack.append(b - a)
            elif c == "*":
                stack.append(stack.pop() * stack.pop())
            elif c == "/":
                a, b = stack.pop(), stack.pop()
                stack.append(int(float(b) / a))
            else:
                stack.append(int(c))
        return stack[0]

"""
},

'4':{
'tag':
['stack'],
'title':
""" 
Generate Parentheses
""",
'note':
""" 
use recursion because there'll be two possibilities for most spots: added open parenthesis, added close parenthesis
However there are some conditions that will dictate this
you won't add a close condition for that spot if you don't already have a valid open parenthesis
you won't add in open/close parenthesis if you've exceeded the number of them you can have
Add the parentheses to a stack (or string) and when you reached your basecase, which is reaching the valid number of open/close parenthesis, save the result as you have found a valid combination
""",
'problem': 
"""
You are given an integer n. Return all well-formed parentheses strings that you can generate with n pairs of parentheses.

Example 1:

Input: n = 1

Output: ["()"]

Example 2:

Input: n = 3

Output: ["((()))","(()())","(())()","()(())","()()()"]

You may return the answer in any order.

Constraints:

    1 <= n <= 7

""",
"code":
""" 
class Solution:
    // n represents the number of pairs of parentheses (3)
    def generateParenthesis(self, n: int) -> List[str]:
        stack = []
        res = []

        def backtrack(open, closed):
            // when you have an equal number of both you know you've reached a combination
            if open == closed == n:
                res.append("".join(stack))
                return

            // cannot have more than three open parenthesis
            if open < n:
                stack.append("(")
                backtrack(open + 1, closed)
                stack.pop()
            
            // cannot supply a closed parenthesis if one is not already open
            if closed < open:
                stack.append(")")
                backtrack(open, closed + 1)
                stack.pop()

        backtrack(0, 0)
        
        return res

"""
},

'5':{
'tag':
['stack'],
'title':
""" 
Daily Temperatures
""",
'note':
""" 
monotonic decreasing stack
you're going to keep track of all of the temperatures as you see them
when you see a number that is greater than the last, pop the last value of the stack
because you found its higher temperature which is what we're looking for.
keep popping all of the values that are lesser because that means we satisfied our condition for that day ( we have found a temperature greater )

along with keeping track of the temperatures each day, will keep track of the index (day) that we last saw it at, and compared to the day/index of this higher value we found

continue forward in the list, adding on values that are lesser than or equal to what is already on the stack, and when you find something greater pop all the days off whose conditions are satisfied

if you start off the list full of zeros, any remaining values on the stack that you couldn't find a higher temperature for, will already have zeros in its spot
""",
'problem': 
"""
You are given an array of integers temperatures where temperatures[i] represents the daily temperatures on the ith day.

Return an array result where result[i] is the number of days after the ith day before a warmer temperature appears on a future day. If there is no day in the future where a warmer temperature will appear for the ith day, set result[i] to 0 instead.

Example 1:

Input: temperatures = [30,38,30,36,35,40,28]

Output: [1,4,1,2,1,0,0]

Example 2:

Input: temperatures = [22,21,20]

Output: [0,0,0]

Constraints:

    1 <= temperatures.length <= 1000.
    1 <= temperatures[i] <= 100


""",
"code":
""" 
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        res = [0] * len(temperatures)
        stack = []  # pair: [temp, index]

        for i, t in enumerate(temperatures):
            while stack and t > stack[-1][0]:
                stackT, stackInd = stack.pop()
                res[stackInd] = i - stackInd
            stack.append((t, i))
        return res

"""
},


'0':{
'tag':
[''],
'title':
""" 

""",
'note':
""" 

""",
'problem': 
"""

""",
"code":
""" 

"""
},

}