 
function fc_data() {
	return {
    "1": {
        "title": "Minimum Stack",
        "number": "115",
        "hint": " \ngetMin needs to return the minimum of the stack at all times,\neven as values get removed from the stack\n",
        "note": " \npush values to both a stack && a minimum stack, keeping track of the minimum at each point in the stack (with a separate stack)\n\nsome other solutions include adding a tuple to your stack, with one value being the new number, and the other value being the minimum at this point\n\nanother solution could also be to keep a minimum stack but only ever updated when we see minimums that are you to or less than the previous minimum\nand when you pop off the value evaluate if you're popping off your current minimum\n",
        "problem": " \nDesign a stack class that supports the push, pop, top, and getMin operations.\n\n    MinStack() initializes the stack object.\n    void push(int val) pushes the element val onto the stack.\n    void pop() removes the element on the top of the stack.\n    int top() gets the top element of the stack.\n    int getMin() retrieves the minimum element in the stack.\n\nEach function should run in O(1)O(1) time.\n\nInput: [\"MinStack\", \"push\", 1, \"push\", 2, \"push\", 0, \"getMin\", \"pop\", \"top\", \"getMin\"]\n\nOutput: [null,null,null,null,0,null,2,1]\n\nExplanation:\nMinStack minStack = new MinStack();\nminStack.push(1);\nminStack.push(2);\nminStack.push(0);\nminStack.getMin(); // return 0\nminStack.pop();\nminStack.top();    // return 2\nminStack.getMin(); // return 1\n\n",
        "code": "\nclass MinStack:\n    def __init__(self):\n        self.stack = []\n        self.minStack = []\n\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        val = min(val, self.minStack[-1] if self.minStack else val)\n        self.minStack.append(val)\n\n    def pop(self) -> None:\n        self.stack.pop()\n        self.minStack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def getMin(self) -> int:\n        return self.minStack[-1]\n"
    },
    "2": {
        "tag": [
            "stack"
        ],
        "title": "Validate Parentheses",
        "note": " \nonly add open characters to the stack, use closed characters to pop the open characters off the stack\nsaid any point that you have a mix matched scenario (\"}\" trying to pop anything but a \"{\"), then we know it's not valid\n",
        "problem": " \nYou are given a string s consisting of the following characters: '(', ')', '{', '}', '[' and ']'.\n\nThe input string s is valid if and only if:\n\n    Every open bracket is closed by the same type of close bracket.\n    Open brackets are closed in the correct order.\n    Every close bracket has a corresponding open bracket of the same type.\n\nReturn true if s is a valid string, and false otherwise.\n\nExample 1:\n\nInput: s = \"[]\"\n\nOutput: true\n\nExample 2:\n\nInput: s = \"([{}])\"\n\nOutput: true\n\nExample 3:\n\nInput: s = \"[(])\"\n\nOutput: false\n\nExplanation: The brackets are not closed in the correct order.\n\nConstraints:\n\n    1 <= s.length <= 1000\n\n",
        "code": "\nclass Solution:\n    def isValid(self, s: str) -> bool:\n        Map = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n        stack = []\n\n        for c in s:\n            if c not in Map:\n                stack.append(c)\n                continue\n            if not stack or stack[-1] != Map[c]:\n                return False\n            stack.pop()\n\n        return not stack\n    \n",
        "hint": null
    },
    "3": {
        "tag": [
            "stack"
        ],
        "title": " \nEvaluate Reverse Polish Notation\n",
        "note": " \nyou're going to add the first two numbers to the stack, and when you have found there operand, you will pop those values off, evaluate their new value (2 + 1 ---> 3), add their new value to the stack, the next number, the next operand, then pop off those two values and perform that calculation:\nInput: tokens = [\"1\",\"2\",\"+\",\"3\",\"*\",\"4\",\"-\"]\ns = [1, 2] ---> 1 + 2 ---> 3\ns = [3, 3] ---> 3 * 3 ---> 9\ns = [9, 4] ---> 9 - 4 ---> 5\n",
        "problem": " \nEvaluate Reverse Polish Notation\n\nYou are given an array of strings tokens that represents a valid arithmetic expression in Reverse Polish Notation.\n\nReturn the integer that represents the evaluation of the expression.\n\n    The operands may be integers or the results of other operations.\n    The operators include '+', '-', '*', and '/'.\n    Assume that division between integers always truncates toward zero.\n\nExample 1:\n(there were only ever be to numbers to evaluate before the operand)\nInput: tokens = [\"1\",\"2\",\"+\",\"3\",\"*\",\"4\",\"-\"]\n\nOutput: 5\n\nExplanation: ((1 + 2) * 3) - 4 = 5\n\nConstraints:\n\n    1 <= tokens.length <= 1000.\n    tokens[i] is \"+\", \"-\", \"*\", or \"/\", or a string representing an integer in the range [-100, 100].\n\n",
        "code": " \nclass Solution:\n    def evalRPN(self, tokens: List[str]) -> int:\n        stack = []\n        for c in tokens:\n            if c == \"+\":\n                stack.append(stack.pop() + stack.pop())\n            elif c == \"-\":\n                a, b = stack.pop(), stack.pop()\n                stack.append(b - a)\n            elif c == \"*\":\n                stack.append(stack.pop() * stack.pop())\n            elif c == \"/\":\n                a, b = stack.pop(), stack.pop()\n                stack.append(int(float(b) / a))\n            else:\n                stack.append(int(c))\n        return stack[0]\n\n",
        "hint": null
    },
    "4": {
        "tag": [
            "stack"
        ],
        "title": " \nGenerate Parentheses\n",
        "note": " \nuse recursion because there'll be two possibilities for most spots: added open parenthesis, added close parenthesis\nHowever there are some conditions that will dictate this\nyou won't add a close condition for that spot if you don't already have a valid open parenthesis\nyou won't add in open/close parenthesis if you've exceeded the number of them you can have\nAdd the parentheses to a stack (or string) and when you reached your basecase, which is reaching the valid number of open/close parenthesis, save the result as you have found a valid combination\n",
        "problem": "\nYou are given an integer n. Return all well-formed parentheses strings that you can generate with n pairs of parentheses.\n\nExample 1:\n\nInput: n = 1\n\nOutput: [\"()\"]\n\nExample 2:\n\nInput: n = 3\n\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n\nYou may return the answer in any order.\n\nConstraints:\n\n    1 <= n <= 7\n\n",
        "code": " \nclass Solution:\n    // n represents the number of pairs of parentheses (3)\n    def generateParenthesis(self, n: int) -> List[str]:\n        stack = []\n        res = []\n\n        def backtrack(open, closed):\n            // when you have an equal number of both you know you've reached a combination\n            if open == closed == n:\n                res.append(\"\".join(stack))\n                return\n\n            // cannot have more than three open parenthesis\n            if open < n:\n                stack.append(\"(\")\n                backtrack(open + 1, closed)\n                stack.pop()\n            \n            // cannot supply a closed parenthesis if one is not already open\n            if closed < open:\n                stack.append(\")\")\n                backtrack(open, closed + 1)\n                stack.pop()\n\n        backtrack(0, 0)\n        \n        return res\n\n",
        "hint": null
    },
    "5": {
        "tag": [
            "stack"
        ],
        "title": " \nDaily Temperatures\n",
        "note": " \nmonotonic decreasing stack\nyou're going to keep track of all of the temperatures as you see them\nwhen you see a number that is greater than the last, pop the last value of the stack\nbecause you found its higher temperature which is what we're looking for.\nkeep popping all of the values that are lesser because that means we satisfied our condition for that day ( we have found a temperature greater )\n\nalong with keeping track of the temperatures each day, will keep track of the index (day) that we last saw it at, and compared to the day/index of this higher value we found\n\ncontinue forward in the list, adding on values that are lesser than or equal to what is already on the stack, and when you find something greater pop all the days off whose conditions are satisfied\n\nif you start off the list full of zeros, any remaining values on the stack that you couldn't find a higher temperature for, will already have zeros in its spot\n",
        "problem": "\nYou are given an array of integers temperatures where temperatures[i] represents the daily temperatures on the ith day.\n\nReturn an array result where result[i] is the number of days after the ith day before a warmer temperature appears on a future day. If there is no day in the future where a warmer temperature will appear for the ith day, set result[i] to 0 instead.\n\nExample 1:\n\nInput: temperatures = [30,38,30,36,35,40,28]\n\nOutput: [1,4,1,2,1,0,0]\n\nExample 2:\n\nInput: temperatures = [22,21,20]\n\nOutput: [0,0,0]\n\nConstraints:\n\n    1 <= temperatures.length <= 1000.\n    1 <= temperatures[i] <= 100\n\n\n",
        "code": " \nclass Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        res = [0] * len(temperatures)\n        stack = []  # pair: [temp, index]\n\n        for i, t in enumerate(temperatures):\n            while stack and t > stack[-1][0]:\n                stackT, stackInd = stack.pop()\n                res[stackInd] = i - stackInd\n            stack.append((t, i))\n        return res\n\n",
        "hint": null
    }
}
}

export {
	fc_data
}


