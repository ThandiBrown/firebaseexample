 
function fc_data() {
	return {
    "1": {
        "title": "Minimum Stack",
        "tag": [
            "115"
        ],
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
    },
    "6": {
        "tag": [
            "hash"
        ],
        "title": " \nDuplicate Integer / Contains Duplicates\n",
        "hint": " \nhashset\n",
        "note": " \ncheck if in hashset or list\n",
        "problem": "\n\n\nGiven an integer array nums, return true if any value appears more than once in the array, otherwise return false.\n\nExample 1:\n\nInput: nums = [1, 2, 3, 3]\n\nOutput: true\n\nExample 2:\n\nInput: nums = [1, 2, 3, 4]\n\nOutput: false\n\n\n",
        "code": " \nclass Solution:\n    def hasDuplicate(self, nums: List[int]) -> bool:\n        hashset = set()\n\n        for n in nums:\n            if n in hashset:\n                return True\n            hashset.add(n)\n        return False\n    \n"
    },
    "7": {
        "tag": [
            "hash"
        ],
        "title": " \nTwo Integer Sum\n",
        "hint": " \nhashmap\n",
        "note": " \nsave the difference of the target and sum in the hashmap\nif you find that difference while looping you have found the solution\nmake sure to save this difference with its index as well \n",
        "problem": "\nGiven an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.\n\nYou may assume that every input has exactly one pair of indices i and j that satisfy the condition.\n\nReturn the answer with the smaller index first.\n\nExample 1:\n\nInput: \nnums = [3,4,5,6], target = 7\n\nOutput: [0,1]\n\nExplanation: nums[0] + nums[1] == 7, so we return [0, 1].\n\nExample 2:\n\nInput: nums = [4,5,6], target = 10\n\nOutput: [0,2]\n\nExample 3:\n\nInput: nums = [5,5], target = 10\n\nOutput: [0,1]\n\nConstraints:\n\n    2 <= nums.length <= 1000\n    -10,000,000 <= nums[i] <= 10,000,000\n    -10,000,000 <= target <= 10,000,000\n\n\n",
        "code": " \nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        prevMap = {}  # val -> index\n\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i\n\n"
    },
    "8": {
        "tag": [
            "hash",
            "linked_list"
        ],
        "title": " \nLRU Cache\n",
        "hint": " \ndoubly linked list\nclass Node\nclass LRUCache\ndummy notes (LRU, MRU)\n",
        "note": " \n\n",
        "problem": "\nImplement the Least Recently Used (LRU) cache class LRUCache. The class should support the following operations\n\n    LRUCache(int capacity) Initialize the LRU cache of size capacity.\n    int get(int key) Return the value cooresponding to the key if the key exists, otherwise return -1.\n    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the introduction of the new pair causes the cache to exceed its capacity, remove the least recently used key.\n\nA key is considered used if a get or a put operation is called on it.\n\nEnsure that get and put each run in O(1)O(1) average time complexity.\n\nExample 1:\n\nInput:\n[\"LRUCache\", [2], \"put\", [1, 10],  \"get\", [1], \"put\", [2, 20], \"put\", [3, 30], \"get\", [2], \"get\", [1]]\n\nOutput:\n[null, null, 10, null, null, 20, -1]\n\nExplanation:\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 10);  // cache: {1=10}\nlRUCache.get(1);      // return 10\nlRUCache.put(2, 20);  // cache: {1=10, 2=20}\nlRUCache.put(3, 30);  // cache: {2=20, 3=30}, key=1 was evicted\nlRUCache.get(2);      // returns 20 \nlRUCache.get(1);      // return -1 (not found)\n\nConstraints:\n\n    1 <= capacity <= 100\n    0 <= key <= 1000\n    0 <= value <= 1000\n\n\n",
        "code": " \nclass Node:\n\tdef __init__(self, key, val):\n\t\tself.key = key\n\t\tself.val = val\n\t\t\n\t\tself.prev = None\n\t\tself.next = None\n\n\nclass LRUCache:\n\tdef __init__(self, capacity: int):\n\t\tself.cap = capacity\n\t\tself.cache = {}  # map key to node\n\n\t\t# these are dummy / unused / label notes\n\t\t# they are used as just the head and end of the linked list, but everything in between are the actual nodes and values\n\t\tself.lru = Node(0, 0)\n\t\tself.mru = Node(0, 0)\n\t\t\n\t\tself.lru.next = self.mru\n\t\t\n\t\tself.mru.prev = self.lru\n\n\tdef remove(self, node):\n\t\t# reassign pointers so that they no longer are pointing at the node\n\t\tprev = node.prev\n\t\t\n\t\tprev.next = node.next\n\t\tnode.next.prev = prev\n\n\tdef insert(self, node):\n\t\t\n\t\tbefore_mru = self.mru.prev\n\t\t\n\t\t# insert new node in between\n\t\tnode.prev = before_mru\n\t\tnode.next = self.mru\n\t\t\n\t\t# reassign pointers so that the new node is seen between\n\t\t# whatever node came before mru, you want their next pointer pointing at node\n\t\tbefore_mru.next = node\n\t\t# then you want mru previous pointer to also be pointing at node\n\t\t# you are essentially placing the node in between those two\n\t\tself.mru.prev = node\n\t\t\n\n\tdef get(self, key: int) -> int:\n\t\tif key in self.cache:\n\t\t\t# remove the node from wherever it is in the list\n\t\t\tself.remove(self.cache[key])\n\t\t\t# and reinsert it towards the MRU side\n\t\t\tself.insert(self.cache[key])\n\t\t\treturn self.cache[key].val\n\t\t\n\t\treturn -1\n\n\tdef put(self, key: int, value: int) -> None:\n\t\tif key in self.cache:\n\t\t\tself.remove(self.cache[key])\n\t\t\n\t\tself.cache[key] = Node(key, value)\n\t\tself.insert(self.cache[key])\n\n\t\tif len(self.cache) > self.cap:\n\t\t\tlru = self.lru.next\n\t\t\tself.remove(lru)\n\t\t\tdel self.cache[lru.key]\n\n"
    },
    "9": {
        "tag": [
            "303",
            "prefix_sum"
        ],
        "title": " \nRange Sum Query - Immutable\n",
        "hint": " \nstart the prefix_sum with a zero and remember that this problem is asking for inclusive\n",
        "note": " \nLesson: you can use the change in sum overtime to tell you something about to tell you about the sums in the array\n\nnums = [-2, 0, 3, -5, 2, -1]\nprefix_sum = [0, -2, -2, 1, -4, -2, -3]\n(left, right) = (0, 2)\nreturn self.prefix_sum[right+1] - self.prefix_sum[left]\nreturn self.prefix_sum[3] - self.prefix_sum[0]\n\nzero represents the sum before the first element\nan element's index + 1, represents the sum after we have included that number\nbecause the array start of zero everything is shifted right\n",
        "problem": "\n\nEasy\nTopics\nCompanies\n\nGiven an integer array nums, handle multiple queries of the following type:\n\n    Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.\n\nImplement the NumArray class:\n\n    NumArray(int[] nums) Initializes the object with the integer array nums.\n    int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).\n\n \n\nExample 1:\n\nInput\n[\"NumArray\", \"sumRange\", \"sumRange\", \"sumRange\"]\n[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]\nOutput\n[null, 1, -1, -3]\n\nExplanation\nNumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);\nnumArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1\nnumArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1\nnumArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3\n\n \n\nConstraints:\n\n    1 <= nums.length <= 104\n    -105 <= nums[i] <= 105\n    0 <= left <= right < nums.length\n    At most 104 calls will be made to sumRange.\n\n\n",
        "code": " \nclass NumArray:\n\n    def __init__(self, nums):\n        self.prefix_sum = [0] * (len(nums) + 1)\n        for i in range(1, len(nums) + 1):\n            self.prefix_sum[i] = self.prefix_sum[i-1] + nums[i-1]\n        \n        \n\n    def sumRange(self, left: int, right: int) -> int:\n        return self.prefix_sum[right+1] - self.prefix_sum[left]\n        \n\n\nnums = [-2, 0, 3, -5, 2, -1]\n# Your NumArray object will be instantiated and called as such:\nobj = NumArray(nums)\nparam_1 = obj.sumRange(0,2)\n"
    },
    "11": {
        "tag": [
            "304",
            "prefix_sum"
        ],
        "title": " \nRange Sum Query 2D - Immutable\n",
        "hint": " \nprefix_sum, subtracting values, extra zeros\n",
        "note": " \nare basically calculated the sum of the columns across a row, and when you get to the next row, you start adding the sum of the previous row at that column as well\nyou need the extra row and column of zeros just for the calculation at the end. If you're starting coordinates have a zero in them, that means there should be no extra sum accumulated for that corresponding row/col, so we need the extra row of zeros to capture that 0 value\n\nthe idea behind the problem is that a single coordinate in the prefix matrix should be able to tell you the sum up to that point from the (0,0) coordinate diagonally down to that coordinate. in order to capture that entire box of values, you need to know the sum across each row up to a particular point, but also the sum of the previous row on top of that because that basically gives you a box sum\n\nthe graphic below basically explains why you need this subtraction element\n<a href=\"https://docs.google.com/document/d/1s1OLYQGAtEhc9gSdtA933b9T6UnVkuYDKW96jTp7bbg/edit#bookmark=id.4cpkg47hfg6d\">Graphic</a>\nhttps://docs.google.com/document/d/1s1OLYQGAtEhc9gSdtA933b9T6UnVkuYDKW96jTp7bbg/edit#bookmark=id.4cpkg47hfg6d\n\n",
        "problem": "\nRange Sum Query 2D - Immutable\n\nGiven a 2D matrix matrix, handle multiple queries of the following type:\n\n    Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).\n\nImplement the NumMatrix class:\n\n    NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.\n    int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).\n\nYou must design an algorithm where sumRegion works on O(1) time complexity.\n\n \n\nExample 1:\n\nInput\n[\"NumMatrix\", \"sumRegion\", \"sumRegion\", \"sumRegion\"]\n[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]\nOutput\n[null, 8, 11, 12]\n\nExplanation\nNumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);\nnumMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)\nnumMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)\nnumMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)\n\n \n\nConstraints:\n\n    m == matrix.length\n    n == matrix[i].length\n    1 <= m, n <= 200\n    -104 <= matrix[i][j] <= 104\n    0 <= row1 <= row2 < m\n    0 <= col1 <= col2 < n\n    At most 104 calls will be made to sumRegion.\n\n\n",
        "code": " \n\ndef sumRegion(matrix, r1, c1, r2, c2) :\n\tROWS = len(matrix)\n\tCOLS = len(matrix[0])\n\t\n\tprefix_matrix = [[0] * (COLS + 1) for i in range(ROWS + 1)]\n\n\tfor row in range(ROWS):\n\t\trow_prefix = 0\n\t\tfor col in range(COLS):\n\t\t\t# adding up the row of the original matrix\n\t\t\trow_prefix += matrix[row][col]\n\t\t\t# grab the number above in the prefix matrix\n\t\t\tcol_prefix = prefix_matrix[row][col + 1]\n\t\t\t# at the spot equivalent to the matrix, add these two values\n\t\t\t# this type comment will only show accurate results if the coordinate is to the bottom right of the (r1, c1)\n\t\t\t# type: matrix, (r1, c1), (r1, col + 1), (row + 1, c1), (row + 1, col + 1)\n\t\t\tprefix_matrix[row + 1][col + 1] = row_prefix + col_prefix\n\t\n\t\n\t\n\t# (r2 + 1, c2 + 1) - the desired sum (offset because the extra row/col of zeros)\n\t# (r2 + 1, c1) - the sum of the columns that should not be included (c1 causing the cutoff)\n\t# (r1, c2 + 1) - the sum of the rows that should not be included (r1 causing the cutoff)\n\t# (r1, c1) - the sum at starting coordinates that gets removed twice by the above two values, thus needs to be added on once\n\treturn (\n\t\tprefix_matrix[r2 + 1][c2 + 1] - prefix_matrix[r2 + 1][c1] - \n\t\tprefix_matrix[r1][c2 + 1] + prefix_matrix[r1][c1]\n\t)\n\n# type: matrix\nmatrix = [\n\t[3, 0, 1, 4, 2],\n\t[5, 6, 3, 2, 1],\n\t[1, 2, 0, 1, 5],\n\t[4, 1, 0, 1, 7],\n\t[1, 0, 3, 0, 5],\n]\n\n"
    }
}
}

export {
	fc_data
}


