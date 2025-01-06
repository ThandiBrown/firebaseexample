flashcard_data = {
'1': {
'title': 'Minimum Stack',
'tag':['115'],
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
'hint':
""" 
when forming the string, you will only ever have to decide between two possibilities: adding open parenthesis, adding close parenthesis
""",
'note':
""" 
use recursion because there'll be two possibilities for most spots: adding open parenthesis, adding close parenthesis
However there are some conditions that will dictate this
you won't add a close condition for that spot if you don't already have a valid open parenthesis
you won't add in open/close parenthesis if you've exceeded the number of them you can have
Add the parentheses to a stack (or string) and when you reached your basecase, which is reaching the valid number of open/close parenthesis, save the result as you have found a valid combination

Lesson:
when thinking about forming combinations or forming recursion, always just think about what step you take at any current moment and whatever base cases to tell you to stop
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

'6':{
'tag':
['hash'],
'title':
""" 
Duplicate Integer / Contains Duplicates
""",
'hint':
""" 
hashset
""",
'note':
""" 
check if in hashset or list
""",
'problem': 
"""


Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

Example 1:

Input: nums = [1, 2, 3, 3]

Output: true

Example 2:

Input: nums = [1, 2, 3, 4]

Output: false


""",
"code":
""" 
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        hashset = set()

        for n in nums:
            if n in hashset:
                return True
            hashset.add(n)
        return False
    
"""
},

'7':{
'tag':
['hash'],
'title':
""" 
Two Integer Sum
""",
'hint':
""" 
hashmap
""",
'note':
""" 
save the difference of the target and sum in the hashmap
if you find that difference while looping you have found the solution
make sure to save this difference with its index as well 
""",
'problem': 
"""
Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.

You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

Return the answer with the smaller index first.

Example 1:

Input: 
nums = [3,4,5,6], target = 7

Output: [0,1]

Explanation: nums[0] + nums[1] == 7, so we return [0, 1].

Example 2:

Input: nums = [4,5,6], target = 10

Output: [0,2]

Example 3:

Input: nums = [5,5], target = 10

Output: [0,1]

Constraints:

    2 <= nums.length <= 1000
    -10,000,000 <= nums[i] <= 10,000,000
    -10,000,000 <= target <= 10,000,000


""",
"code":
""" 
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i

"""
},

'8':{
'tag':
['hash', 'linked_list'],
'title':
""" 
LRU Cache
""",
'hint':
""" 
doubly linked list
class Node
class LRUCache
dummy notes (LRU, MRU)
""",
'note':
""" 

""",
'problem': 
"""
Implement the Least Recently Used (LRU) cache class LRUCache. The class should support the following operations

    LRUCache(int capacity) Initialize the LRU cache of size capacity.
    int get(int key) Return the value cooresponding to the key if the key exists, otherwise return -1.
    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the introduction of the new pair causes the cache to exceed its capacity, remove the least recently used key.

A key is considered used if a get or a put operation is called on it.

Ensure that get and put each run in O(1)O(1) average time complexity.

Example 1:

Input:
["LRUCache", [2], "put", [1, 10],  "get", [1], "put", [2, 20], "put", [3, 30], "get", [2], "get", [1]]

Output:
[null, null, 10, null, null, 20, -1]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 10);  // cache: {1=10}
lRUCache.get(1);      // return 10
lRUCache.put(2, 20);  // cache: {1=10, 2=20}
lRUCache.put(3, 30);  // cache: {2=20, 3=30}, key=1 was evicted
lRUCache.get(2);      // returns 20 
lRUCache.get(1);      // return -1 (not found)

Constraints:

    1 <= capacity <= 100
    0 <= key <= 1000
    0 <= value <= 1000


""",
"code":
""" 
class Node:
	def __init__(self, key, val):
		self.key = key
		self.val = val
		
		self.prev = None
		self.next = None


class LRUCache:
	def __init__(self, capacity: int):
		self.cap = capacity
		self.cache = {}  # map key to node

		# these are dummy / unused / label notes
		# they are used as just the head and end of the linked list, but everything in between are the actual nodes and values
		self.lru = Node(0, 0)
		self.mru = Node(0, 0)
		
		self.lru.next = self.mru
		
		self.mru.prev = self.lru

	def remove(self, node):
		# reassign pointers so that they no longer are pointing at the node
		prev = node.prev
		
		prev.next = node.next
		node.next.prev = prev

	def insert(self, node):
		
		before_mru = self.mru.prev
		
		# insert new node in between
		node.prev = before_mru
		node.next = self.mru
		
		# reassign pointers so that the new node is seen between
		# whatever node came before mru, you want their next pointer pointing at node
		before_mru.next = node
		# then you want mru previous pointer to also be pointing at node
		# you are essentially placing the node in between those two
		self.mru.prev = node
		

	def get(self, key: int) -> int:
		if key in self.cache:
			# remove the node from wherever it is in the list
			self.remove(self.cache[key])
			# and reinsert it towards the MRU side
			self.insert(self.cache[key])
			return self.cache[key].val
		
		return -1

	def put(self, key: int, value: int) -> None:
		if key in self.cache:
			self.remove(self.cache[key])
		
		self.cache[key] = Node(key, value)
		self.insert(self.cache[key])

		if len(self.cache) > self.cap:
			lru = self.lru.next
			self.remove(lru)
			del self.cache[lru.key]

"""
},

'9':{
'tag':
['303', 'prefix_sum'],
'title':
""" 
Range Sum Query - Immutable
""",
'hint':
""" 
start the prefix_sum with a zero and remember that this problem is asking for inclusive
""",
'note':
""" 
Lesson: you can use the change in sum overtime to tell you something about to tell you about the sums in the array

nums = [-2, 0, 3, -5, 2, -1]
prefix_sum = [0, -2, -2, 1, -4, -2, -3]
(left, right) = (0, 2)
return self.prefix_sum[right+1] - self.prefix_sum[left]
return self.prefix_sum[3] - self.prefix_sum[0]

zero represents the sum before the first element
an element's index + 1, represents the sum after we have included that number
because the array start of zero everything is shifted right
""",
'problem': 
"""

Easy
Topics
Companies

Given an integer array nums, handle multiple queries of the following type:

    Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Implement the NumArray class:

    NumArray(int[] nums) Initializes the object with the integer array nums.
    int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3

 

Constraints:

    1 <= nums.length <= 104
    -105 <= nums[i] <= 105
    0 <= left <= right < nums.length
    At most 104 calls will be made to sumRange.


""",
"code":
""" 
class NumArray:

    def __init__(self, nums):
        self.prefix_sum = [0] * (len(nums) + 1)
        for i in range(1, len(nums) + 1):
            self.prefix_sum[i] = self.prefix_sum[i-1] + nums[i-1]
        
        

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix_sum[right+1] - self.prefix_sum[left]
        


nums = [-2, 0, 3, -5, 2, -1]
# Your NumArray object will be instantiated and called as such:
obj = NumArray(nums)
param_1 = obj.sumRange(0,2)
"""
},

'10':{
'tag':
['304', 'prefix_sum'],
'title':
""" 
Range Sum Query 2D - Immutable
""",
'hint':
""" 
prefix_sum, subtracting values, extra zeros
""",
'note':
""" 
are basically calculated the sum of the columns across a row, and when you get to the next row, you start adding the sum of the previous row at that column as well
you need the extra row and column of zeros just for the calculation at the end. If you're starting coordinates have a zero in them, that means there should be no extra sum accumulated for that corresponding row/col, so we need the extra row of zeros to capture that 0 value

the idea behind the problem is that a single coordinate in the prefix matrix should be able to tell you the sum up to that point from the (0,0) coordinate diagonally down to that coordinate. in order to capture that entire box of values, you need to know the sum across each row up to a particular point, but also the sum of the previous row on top of that because that basically gives you a box sum

the graphic below basically explains why you need this subtraction element
<a href="https://docs.google.com/document/d/1s1OLYQGAtEhc9gSdtA933b9T6UnVkuYDKW96jTp7bbg/edit#bookmark=id.4cpkg47hfg6d" target="_blank">Graphic</a>

Lesson: how to save the prefix sum for a matrix, how to delete/discard information correctly
""",
'problem': 
"""
Range Sum Query 2D - Immutable

Given a 2D matrix matrix, handle multiple queries of the following type:

    Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Implement the NumMatrix class:

    NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
    int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

You must design an algorithm where sumRegion works on O(1) time complexity.

 

Example 1:

Input
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output
[null, 8, 11, 12]

Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)

 

Constraints:

    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 200
    -104 <= matrix[i][j] <= 104
    0 <= row1 <= row2 < m
    0 <= col1 <= col2 < n
    At most 104 calls will be made to sumRegion.


""",
"code":
""" 

def sumRegion(matrix, r1, c1, r2, c2) :
	ROWS = len(matrix)
	COLS = len(matrix[0])
	
	prefix_matrix = [[0] * (COLS + 1) for i in range(ROWS + 1)]

	for row in range(ROWS):
		row_prefix = 0
		for col in range(COLS):
			# adding up the row of the original matrix
			row_prefix += matrix[row][col]
			# grab the number above in the prefix matrix
			col_prefix = prefix_matrix[row][col + 1]
			# at the spot equivalent to the matrix, add these two values
			# this type comment will only show accurate results if the coordinate is to the bottom right of the (r1, c1)
			# type: matrix, (r1, c1), (r1, col + 1), (row + 1, c1), (row + 1, col + 1)
			prefix_matrix[row + 1][col + 1] = row_prefix + col_prefix
	
	
	
	# (r2 + 1, c2 + 1) - the desired sum (offset because the extra row/col of zeros)
	# (r2 + 1, c1) - the sum of the columns that should not be included (c1 causing the cutoff)
	# (r1, c2 + 1) - the sum of the rows that should not be included (r1 causing the cutoff)
	# (r1, c1) - the sum at starting coordinates that gets removed twice by the above two values, thus needs to be added on once
	return (
		prefix_matrix[r2 + 1][c2 + 1] - prefix_matrix[r2 + 1][c1] - 
		prefix_matrix[r1][c2 + 1] + prefix_matrix[r1][c1]
	)

# type: matrix
matrix = [
	[3, 0, 1, 4, 2],
	[5, 6, 3, 2, 1],
	[1, 2, 0, 1, 5],
	[4, 1, 0, 1, 7],
	[1, 0, 3, 0, 5],
]

"""
},

'11':{
'tag':
['724', 'prefix_sum'],
'title':
""" 
Find Pivot Index
""",
'hint':
""" 
prefix_sum  and postfix_sum, but with zero space, just use two variables
""",
'note':
""" 
find the sum of the array
make two variables representing the sum on either side of an element (lSum, rSum)
one of these variables will be the sum of the array (rSum)
for each element in the list, first subtract the current element from the sum so that we can simulate it not being included
[1,7,3,6,5,6] ---> sum = 28
if current element = 1, lSum = 0, rSum = 27, (1 is not included)
evaluate if the two sums are equal, if not, add the current element to the lSum, move onto the next current element (7), and make sure that is not included in the rSum
if current element = 7, lSum = 1, rSum = 20, (7 is not included)
continue until they are equal. return the index in which they are equal
<a href="https://docs.google.com/document/d/1s1OLYQGAtEhc9gSdtA933b9T6UnVkuYDKW96jTp7bbg/edit#bookmark=id.tbkmvwhjtakr" target="_blank">Graphic</a>
""",
'problem': 
"""

Easy
Topics
Companies
Hint

Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

 

Example 1:

Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

Example 2:

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

Example 3:

Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0

 

Constraints:

    1 <= nums.length <= 104
    -1000 <= nums[i] <= 1000

 
""",
"code":
""" 
# Time Complexity : O(n)
# Space Complexity : O(1)
class Solution(object):
    def pivotIndex(self, nums):
        
        leftSum, rightSum = 0, sum(nums)
        
        for idx, ele in enumerate(nums):
            # don't include the current element in the sum
            rightSum -= ele
            
            if leftSum == rightSum:
                return idx          # Return the pivot index...
            
            # include the element after evaluation
            leftSum += ele
        return -1                   # If there is no index that satisfies the conditions in the problem statement...
"""
},

'12':{
'tag':
['prefix_sum', '238'],
'title':
""" 
Products of Array Discluding Self
""",
'hint':
""" 
prefix and postfix, only one new array tho
""",
'note':
""" 
because we want to know the someone either side of the element, we can calculate the pre-and post-fix sums, and just look at those sums, before & after that element (that is not including it)
""",
'problem': 
"""

Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].

Each product is guaranteed to fit in a 32-bit integer.

Follow-up: Could you solve it in O(n)O(n) time without using the division operation?

Example 1:

Input: nums = [1,2,4,6]

Output: [48,24,12,8]

Example 2:

Input: nums = [-1,0,1,2,3]

Output: [0,-6,0,0,0]

Constraints:

    2 <= nums.length <= 1000
    -20 <= nums[i] <= 20


""",
"code":
""" 
class Solution:
    def productExceptSelf(self, nums):
        # list of one's
        prefix = [1] * (len(nums))

        for i in range(1, len(nums)):
            # calculate the prefix of the first len(nums) - 1 elements
            prefix[i] = prefix[i-1] * nums[i-1]
                
        # using postfix as a number rather than an array
        postfix = 1
        
        # reversing backwards through the list
        for i in range(len(nums) - 1, -1, -1):
            # if you times the prefix of an element and the postfix of the element, then you will have the product of all the elements besides itself
            # prefix of 6 in [1, 2, 4, 6] is 8
            # because 6 is at the end, the postfix starts as 1
            # 8 * 1 = 8 a which is the product of every number besides 6
            # for 4 ---> prefix = 2, postfix = 1 * 6 ---> 2 * 6 = 12 which is the correct answer
            prefix[i] *= postfix
            # adding numbers to the postfix as usual
            postfix *= nums[i]
        
        return prefix
"""
},

'13':{
'tag':
['560', 'prefix_sum'],
'title':
""" 
Subarray Sum Equals K
""",
'hint':
""" 
prefix_sum, the difference in sums over time can tell you about the sums between different elements
""",
'note':
""" 
the prefix_sum before any array is 0. if we calculate the prefix sum along the way (is a int variable) and see that we have seen a sum before that is the difference between the current prefix_sum and the target sum, we know that the elements in between those points are equal to the target sum. For the problem, they only want the count/occurrence, so we don't need to save the indices but we do need to save the frequencies that we've seen particular sum. Check code comments for more.
""",
'problem': 
"""

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2

Example 2:

Input: nums = [1,2,3], k = 3
Output: 2

 

Constraints:

    1 <= nums.length <= 2 * 104
    -1000 <= nums[i] <= 1000
    -107 <= k <= 107


""",
"code":
""" 
from collections import defaultdict

class Solution:
	def subarraySum(self, nums, k: int) -> int:
		# use a hash map to keep count of the frequency at which you seen a certain sum so far
		# the frequency matters because if you saw a sum of three at index 2 and at index 4, by the time you get to index 7 and the sum is now 6, those would be to instances in which the sum has changed by 3 (2 ---> 7 & 4 ---> 7) and we want to count those both
		prefix_sum_count = defaultdict(int)
        
		# we know that the prefix_sum before any array is 0, with a frequency of one
		prefix_sum_count[0] = 1  # Initialize with 0 prefix sum count for the base case
		current_sum = 0
		count = 0
		
		for num in nums:
			current_sum += num
            
			# check if we've seen the difference before
			if (current_sum - k) in prefix_sum_count:
            
				# if so, get the frequency at which we've seen this difference and added to the count
				count += prefix_sum_count[current_sum - k]
			
            # increase the frequency that we've seen this particular sum
			prefix_sum_count[current_sum] += 1
		
		return count
"""
},

'14':{
'tag':
[''],
'title':
""" 
Duplicate Integer
""",
'hint':
""" 

""",
'note':
""" 

""",
'problem': 
"""
Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

Example 1:

Input: nums = [1, 2, 3, 3]

Output: true

Example 2:

Input: nums = [1, 2, 3, 4]

Output: false


""",
"code":
""" 
class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        hashset = set()

        for n in nums:
            if n in hashset:
                return True
            hashset.add(n)
        return False
    
"""
},

'15':{
'tag':
['hash'],
'title':
""" 
Is Anagram
""",
'hint':
""" 
hashmap
""",
'note':
""" 
you basically want to count the frequency of each character in the string and compare the dictionaries to make sure that they're the same
you can write a good base case checking the length first
""",
'problem': 
"""


Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

Example 1:

Input: s = "racecar", t = "carrace"

Output: true

Example 2:

Input: s = "jar", t = "jam"

Output: false

Constraints:

    s and t consist of lowercase English letters.


""",
"code":
""" 
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        countS, countT = {}, {}

        for i in range(len(s)):
            countS[s[i]] = 1 + countS.get(s[i], 0)
            countT[t[i]] = 1 + countT.get(t[i], 0)
        return countS == countT

"""
},

'16':{
'tag':
['hash'],
'title':
""" 
Two Integer Sum
""",
'hint':
""" 
hash, save the index
""",
'note':
""" 
you basically want to save the difference of the current number and target sum and its index 
while traversing the array if you see this difference, get the index of the first number(diff) in the current number(i)
""",
'problem': 
"""

Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.

You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

Return the answer with the smaller index first.

Example 1:

Input: 
nums = [3,4,5,6], target = 7

Output: [0,1]

Explanation: nums[0] + nums[1] == 7, so we return [0, 1].

Example 2:

Input: nums = [4,5,6], target = 10

Output: [0,2]

Example 3:

Input: nums = [5,5], target = 10

Output: [0,1]

Constraints:

    2 <= nums.length <= 1000
    -10,000,000 <= nums[i] <= 10,000,000
    -10,000,000 <= target <= 10,000,000


""",
"code":
""" 
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            
            if diff in prevMap:
                return [prevMap[diff], i]
            
            prevMap[n] = i

"""
},

'17':{
'tag':
['hash'],
'title':
""" 
Anagram Groups
""",
'hint':
""" 

""",
'note':
""" 
Lesson: ord can be used
the normal solution would be O(m*n*log(n)) solution in which we sort all of the strings and save that as the key, counting frequency
the solution is O(m*n) in which M is the number of strings and N is the average length of each string
""",
'problem': 
"""

Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

Example 1:

Input: strs = ["act","pots","tops","cat","stop","hat"]

Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]

Example 2:

Input: strs = ["x"]

Output: [["x"]]

Example 3:

Input: strs = [""]

Output: [[""]]

Constraints:

    1 <= strs.length <= 1000.
    0 <= strs[i].length <= 100
    strs[i] is made up of lowercase English letters.


""",
"code":
""" 
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        ans = defaultdict(list)

        for s in strs:
            # 26 for a - z
            count = [0] * 26
            for char in s:
                # returns the ASCII value
                count[ord(char) - ord("a")] += 1
            
            # cannot save a list as a key, so convert it to tuple
            ans[tuple(count)].append(s)
        
        return ans.values()

"""
},

'18':{
'tag':
['hash'],
'title':
""" 
Top K Elements in List
""",
'hint':
""" 
user frequency hash map and frequency array
""",
'note':
""" 
nums: [1,2,2,2,2,4,4]
Step One: 
 - keep count of the frequency. Every time you see a number, up the count
num_count: {1: 1, 2: 4, 4: 2}

Next: 
 - convert into a frequency array
 - the frequency array is the length of original array because you cannot have a single number that occurs more than all the numbers that exist
 - the frequency array should be a length + 1 because if you have a frequency of 7, you need to use the 8th index which we know is "7"

freq_as_idx: [[], [1], [4], [], [2], [], [], []]
(1 has a frequency of 1, 4 has a frequency of 2, 2 has a frequency of 4)

Next:
 - loop backwards through the array
 - you'll see the highest frequency number first
 - keep collecting until you see the number needed

result.append(2) 
result.append(4)
if len(result) == nums_needed: (T)
return [2, 4]
""",
'problem': 
"""

Given an integer array nums and an integer k, return the k most frequent elements within the array.

The test cases are generated such that the answer is always unique.

You may return the output in any order.

Example 1:

Input: nums = [1,2,2,3,3,3], k = 2

Output: [2,3]

Example 2:

Input: nums = [7,7], k = 1

Output: [7]

Constraints:

    1 <= nums.length <= 10^4.
    -1000 <= nums[i] <= 1000
    1 <= k <= number of distinct elements in nums.


""",
"code":
""" 
def topKFrequent(nums, nums_needed):
    num_count = {}
    freq_as_idx = [[] for i in range(len(nums) + 1)]

    
    for num in nums:
        num_count[num] = 1 + num_count.get(num, 0)
            

    for num, freq in num_count.items():
        freq_as_idx[freq].append(num)

    
    result = []
    for i in range(len(freq_as_idx) - 1, 0, -1):
        for num in freq_as_idx[i]:
            result.append(num)
            if len(result) == nums_needed:
                return result


f = topKFrequent([1,2,2,2,2,4,4], 2)
# f = topKFrequent([2,2,2,2,2,2,2], 2)
print(f)
"""
},

'19':{
'tag':
[''],
'title':
""" 
String Encode and Decode
""",
'hint':
""" 

""",
'note':
""" 
join the string with the length of the string plus a '#'
this will work because even if there are more numbers and #s, the initial one will cover the length:
['1#', 'good', 'ha2#ppy'] ---> 2#1#4#good7#ha2#ppy
when decoding we will look at the *first* number-hash combination: 2# therefore regardless with the next two characters say, we know that the part of the original string:
2# ---> {1#}
4# ---> {good}
7# ---> {ha2#ppy}

Lesson: the number was what really is allowing us to skip over the characters/cause the decoding
the hashes just so that we know where the number actually stops so that we don't confuse '271' if we mean '2#71'
""",
'problem': 
"""

Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

Please implement encode and decode

Example 1:

Input: ["neet","code","love","you"]

Output:["neet","code","love","you"]

Example 2:

Input: ["we","say",":","yes"]

Output: ["we","say",":","yes"]

Constraints:

    0 <= strs.length < 100
    0 <= strs[i].length < 200
    strs[i] contains only UTF-8 characters.

""",
"code":
""" 
class Solution:
	
	def encode(self, strs: List[str]) -> str:
		res = ""
		for string in strs:
			res += str(len(string)) + "#" + string
		return res

	def decode(self, string: str) -> List[str]:
		res = []
		i = 0
		
		while i < len(string):
			j = i
			while string[j] != '#':
				j += 1
			length = int(string[i:j])
			# j is pointing to the '#', so j + 1 will point to the string after
			i = j + 1
			# j is moved after the string, pointing at the next number-# combo
			j = i + length
			# capture the string
			res.append(string[i:j])
			# move i to the start of the next combo
			i = j
			
		return res

"""
},

'20':{
'tag':
['hash'],
'title':
""" 
Valid Sudoku
""",
'hint':
""" 
three hashmaps
""",
'note':
""" 
you're basically going to have a hashmap for the rows
rows[0] = [1, 2, 7, 8] ---> represents the values in the first row of the sudoku board
when you see a coordinate (r, c), get its value (board[r][c]), check the row and col hashmaps to see if that value already exists
board[0][3] = 6
rows[0] = [1, 2, 7, 8]
col[3] = [3, 5, 9]

is 6 already in rows[0]? ---> No
is 6 already in col[3]? ---> No
update these hashmaps and continue the search

in order to check the 3 x 3 grid in the sudoku, will have another hashmap representing that area
we know that (0, 1, 2), (3, 4, 5), (6, 7, 8) all produce the same quotient with integer division by three so that's how we segment out an area
we know that coordinate (2, 5) points to the same box as (0, 4) because when they integer divide, it will all point to box (0, 1) which is the second box in the first row

Lesson: the trick here is mostly getting creative in trying to find out how the coordinates in each box can be grouped together/related to each other.in this case it was that they all share the same quotients when they were divided by three
""",
'problem': 
"""

You are given a a 9 x 9 Sudoku board board. A Sudoku board is valid if the following rules are followed:

    Each row must contain the digits 1-9 without duplicates.
    Each column must contain the digits 1-9 without duplicates.
    Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without duplicates.

Return true if the Sudoku board is valid, otherwise return false

Note: A board does not need to be full or be solvable to be valid.
<a href="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/0be40c5d-2d18-42b8-261b-13ca50de4100/public" target="_blank">Graphic</a>

Example 1:

Input: board = 
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","8",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]

Output: true

Example 2:

Input: board = 
[["1","2",".",".","3",".",".",".","."],
 ["4",".",".","5",".",".",".",".","."],
 [".","9","1",".",".",".",".",".","3"],
 ["5",".",".",".","6",".",".",".","4"],
 [".",".",".","8",".","3",".",".","5"],
 ["7",".",".",".","2",".",".",".","6"],
 [".",".",".",".",".",".","2",".","."],
 [".",".",".","4","1","9",".",".","8"],
 [".",".",".",".","8",".",".","7","9"]]

Output: false

Explanation: There are two 1's in the top-left 3x3 sub-box.

Constraints:

    board.length == 9
    board[i].length == 9
    board[i][j] is a digit 1-9 or '.'.


""",
"code":
""" 
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        cols = defaultdict(set)
        rows = defaultdict(set)
        squares = defaultdict(set)  # key = (r /3, c /3)

        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    continue
                if (
                    board[r][c] in rows[r]
                    or board[r][c] in cols[c]
                    or board[r][c] in squares[(r // 3, c // 3)]
                ):
                    return False
                cols[c].add(board[r][c])
                rows[r].add(board[r][c])
                squares[(r // 3, c // 3)].add(board[r][c])

        return True

"""
},

'21':{
'tag':
['hash'],
'title':
""" 
Longest Consecutive Sequence
""",
'hint':
""" 
sequences do not have to be contiguous
it's about finding the minimum
""",
'note':
""" 
this problem uses a creative way to find the minimum at each point in the array
nums = [2,20,4,10,3,4,5] (turn into a set to remove duplicates)
in nums, '2, 20, 10' are all the minimums of their own sequence
we know that 2 as a minimum of a sequence for example because there is no (n - 1) ---> (2 - 1) ---> 1 in the list. because there is no 19 and list we know that 20 would be a minimum of its own sequence
so once we find a minimum, we simply check if it's value  + 1,  + 2,  + 3... etc exist in the list, all the while counting the length
once we have 2, we check it 3 is present then we check in 4 is present until we don't find the next value
save the length that this current point
""",
'problem': 
"""

Given an array of integers nums, return the length of the longest consecutive sequence of elements.

A consecutive sequence is a sequence of elements in which each element is exactly 1 greater than the previous element.

You must write an algorithm that runs in O(n) time.

Example 1:

Input: nums = [2,20,4,10,3,4,5]

Output: 4

Explanation: The longest consecutive sequence is [2, 3, 4, 5].

Example 2:

Input: nums = [0,3,2,5,4,6,1,1]

Output: 7

Constraints:

    0 <= nums.length <= 1000
    -10^9 <= nums[i] <= 10^9


""",
"code":
""" 
class Solution:
    def longestConsecutive(self, nums):
        numSet = set(nums)
        longest = 0

        for num in numSet:
            # check if this is the start of the sequence
            # you know this is the start of a sequence if there is not a number directly 1 less than it
            if (num - 1) not in numSet:
                length = 1
                # when you have found the start of a sequence, keep checking the next number to see how long the sequence ss
                while (num + length) in numSet:
                    length += 1
                longest = max(length, longest)
            # if it is not the start of a sequence keep iterating forward
        return longest

"""
},

'22':{
'tag':
['two_pointer'],
'title':
""" 
Is Palindrome
""",
'hint':
""" 

""",
'note':
""" 
loop over non-alphaNum characters
""",
'problem': 
"""

Given a string s, return true if it is a palindrome, otherwise return false.

A palindrome is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

Example 1:

Input: s = "Was it a car or a cat I saw?"

Output: true

Explanation: After considering only alphanumerical characters we have "wasitacaroracatisaw", which is a palindrome.

Example 2:

Input: s = "tab a cat"

Output: false

Explanation: "tabacat" is not a palindrome.

Constraints:

    1 <= s.length <= 1000
    s is made up of only printable ASCII characters.


""",
"code":
""" 
class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1

        while l < r:
            while l < r and not self.alphaNum(s[l]):
                l += 1
            while r > l and not self.alphaNum(s[r]):
                r -= 1
            if s[l].lower() != s[r].lower():
                return False
            l, r = l + 1, r - 1
        return True
    
    def alphaNum(self, c):
        return (ord('A') <= ord(c) <= ord('Z') or 
                ord('a') <= ord(c) <= ord('z') or 
                ord('0') <= ord(c) <= ord('9'))

"""
},

'23':{
'tag':
['two_pointer'],
'title':
""" 
Two Integer Sum II
""",
'hint':
""" 

""",
'note':
""" 

""",
'problem': 
"""

Given an array of integers numbers that is sorted in non-decreasing order.

Return the indices (1-indexed) of two numbers, [index1, index2], such that they add up to a given target number target and index1 < index2. Note that index1 and index2 cannot be equal, therefore you may not use the same element twice.

There will always be exactly one valid solution.

Your solution must use O(1)O(1) additional space.

Example 1:

Input: numbers = [1,2,3,4], target = 3

Output: [1,2]

Explanation:
The sum of 1 and 2 is 3. Since we are assuming a 1-indexed array, index1 = 1, index2 = 2. We return [1, 2].

Constraints:

    2 <= numbers.length <= 1000
    -1000 <= numbers[i] <= 1000
    -1000 <= target <= 1000


""",
"code":
""" 
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers) - 1

        while l < r:
            curSum = numbers[l] + numbers[r]

            if curSum > target:
                r -= 1
            elif curSum < target:
                l += 1
            else:
                return [l + 1, r + 1]

"""
},

'24':{
'tag':
['26', 'two_pointer'],
'title':
""" 
Remove Duplicates from Sorted Array
""",
'hint':
""" 

""",
'note':
""" 
[0,0,1,1,1,1,2,3,3]
each time you detect a number change, that means you have found a new unique number
0 ---> 1, 1 ---> 2, we just save each time we see the new number
the problem already lets us know that sorted so we know all the numbers will be next to each other

Lesson: this mostly has to do with how you should look at sorted lists when it comes to duplicates
""",
'problem': 
"""
Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

    Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
    Return k.


Example 1:

Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Example 2:

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

 

Constraints:

    1 <= nums.length <= 3 * 104
    -100 <= nums[i] <= 100
    nums is sorted in non-decreasing or
""",
"code":
""" 
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        next_elem = 1
        for i in range(1, len(nums)):
            # if there is a change in number
            if nums[i] != nums[i - 1]:
                nums[next_elem] = nums[i]
                next_elem += 1
        return next_elem
"""
},

'25':{
'tag':
['80', 'two_pointer'],
'title':
""" 
Remove Duplicates from Sorted Array II
""",
'hint':
""" 
think of the problem as shifting down numbers of the array
""",
'note':
""" 
any list 0-2 elements won't have more than the allowed number of duplicates, so it's automatically valid
the best way to think of this problem is that were truly shifting down elements of the array
we're moreso just determining which elements to shift down
if we've seen the same element more than twice, we don't need to continue shifting that number
Lesson: consider all edge cases and scenarios
""",
'problem': 
"""
Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}

If all assertions pass, then your solution will be accepted.

 

Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

 

Constraints:

    1 <= nums.length <= 3 * 104
    -104 <= nums[i] <= 104
    nums is sorted in non-decreasing order.


""",
"code":
""" 
class Solution:
	def removeDuplicates(self, nums):
	   
		if len(nums) <= 2: 
			return len(nums)
		
		count = 1
		next = 1
		
		for i in range(1, len(nums)):
			if nums[i] == nums[i - 1]:
				count += 1
			else:
				# we've seen a new number
                count = 1
				
			# shifting down elements if we haven't seen them more than twice
            if count <= 2:
				nums[next] = nums[i]
				next += 1

		return next

# Solution().removeDuplicates([1,1,1,2,2,3])
Solution().removeDuplicates([0,0,0,1,1,1,1,2,3,3, 4])
"""
},

'26':{
'tag':
['two_pointer'],
'title':
""" 
Max Water Container / Container With Most Water
""",
'hint':
""" 
only the minimum matters
""",
'note':
""" 

""",
'problem': 
"""

You are given an integer array heights where heights[i] represents the height of the ithith bar.

You may choose any two bars to form a container. Return the maximum amount of water a container can store.

Example 1:
<a href="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/77f004c6-e773-4e63-7b99-a2309303c700/public" target="_blank">Graphic</a>

Input: height = [1,7,2,5,4,7,3,6]

Output: 36

Example 2:

Input: height = [2,2,2]

Output: 4

Constraints:

    2 <= height.length <= 1000
    0 <= height[i] <= 1000

""",
"code":
""" 
class Solution:
    def maxArea(self, heights: List[int]) -> int:
        l, r = 0, len(heights) - 1
        res = 0
        previous = 0

        while l < r:
            current_minimum = min(heights[l], heights[r])

            # you only need to calculate a new area if you have a new, increased minimum
            # because every other bar would just be less distance with an even lower/equal minimum
            if current_minimum > previous or l == 0:
                res = max(res, current_minimum * (r - l))
                previous = current_minimum
            
            if heights[l] < heights[r]:
                l += 1
            
            # if the two bars are equal doesn't matter whether you move left or right
            # because the area will only be greater than those two equal bars, if there are
            # two bars that are both greater than those equal bars, and based on the algorithm
            # no matter which way you move, if that's the case, you will find both bars
            elif heights[r] <= heights[l]:
                r -= 1
            
        return res
"""
},

'27':{
'tag':
['two_pointer'],
'title':
""" 
Trapping Rain Water
""",
'hint':
""" 
you will oscillate between evaluating the left and right values
""",
'note':
""" 
you are iterating through the array trying to determine how much water can sit on top of a particular bar
in order to determine this you need to know your left and right boundaries
your bar does not have a left boundary if there is no left value that is greater than it
Once you have determined your left and right boundary, then you can know how much water sits on top of your bar once you subtract the height of your bar from the minimum boundary, whether it be your left or right
In fact, since the minimum boundaries the only one that matters (doesn't matter how tall your maximum boundary is , as your minimum boundary sets how high the water can go )
Therefore we often only really need to know the minimum boundary to our bar
we will go back and forth between evaluating bars from the right and left depending on whether the minimum boundary is to the left or right
if the minimum/lower boundary is to the left we will  be evaluating bars on the left, if at any point the minimum boundary is comming from the right, we will start evaluating bars from the right
We want to keep track of the highest bar to the left and the right at any point in time (because these are boundaries). Still, between these two bars one will be lower than the other (or equal)
""",
'problem': 
"""

You are given an array non-negative integers heights which represent an elevation map. Each value heights[i] represents the height of a bar, which has a width of 1.

Return the maximum area of water that can be trapped between the bars.

Example 1:
<a href="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/0c25cb81-1095-4382-fff2-6ef77c1fd100/public" target="_blank">Graphic</a>

Input: height = [0,2,0,3,1,0,1,3,2,1]

Output: 9

Constraints:

    1 <= height.length <= 1000
    0 <= height[i] <= 1000


""",
"code":
""" 
class Solution:
    def trap(self, height):
        if not height:
            return 0

        l = 0
        r = len(height) - 1
        
        leftMax = height[l]
        rightMax = height[r]
        res = 0
        
        while l < r:
            
            if leftMax < rightMax:
                l += 1
                leftMax = max(leftMax, height[l])
                res += leftMax - height[l]
            
            else:
                r -= 1
                rightMax = max(rightMax, height[r])
                res += rightMax - height[r]
        
        return res

Solution().trap([0,1,0,2,1,0,1,3,2,1,2,1])
"""
},

'28':{
'tag':
['two_pointer'],
'title':
""" 
Three Integer Sum
""",
'hint':
""" 
must be zero-sum, two_pointer, O(n^2) solution
""",
'note':
""" 
you will sort the array
you will pick a number as the start number ( the start number will change at the start of each loop )
you will look at every other number after that point to try to find two numbers that will cause a sum of zero, using two pointers
[-1,0,1,2,-1,-4] ---> [-4, -1, -1, 0, 1, 2]
so -4 would be our first number (of the potential three sum) and then the left pointer would point at -1, the right pointer would point at -2
if the sum is too large that we move down the right pointer, if the sum is too small then we move the left pointer
skip over duplicates
""",
'problem': 
"""
FIND TRIPLETS WHERE SUM IS EQUAL TO ZERO
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] where nums[i] + nums[j] + nums[k] == 0, and the indices i, j and k are all distinct.

The output should not contain any duplicate triplets. You may return the output and the triplets in any order.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]

Output: [[-1,-1,2],[-1,0,1]]

Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].

Example 2:

Input: nums = [0,1,1]

Output: []

Explanation: The only possible triplet does not sum up to 0.

Example 3:

Input: nums = [0,0,0]

Output: [[0,0,0]]

Explanation: The only possible triplet sums up to 0.

Constraints:

    3 <= nums.length <= 1000
    -10^5 <= nums[i] <= 10^5


""",
"code":
""" 
class Solution:
    def threeSum(self, nums):
        res = []
        # sorted array
        nums.sort()

        # picking the first of the three numbers
        for idx, num in enumerate(nums):
            # if your first value is not negative then you won't find any sum the equals zero with the remaining left and right pointers
            if num > 0:
                break

            # skip over duplicate values
            if idx > 0 and num == nums[idx - 1]:
                continue

            # picking the second and third of the three numbers
            l = idx + 1
            r = len(nums) - 1
            
            while l < r:
                threeSum = num + nums[l] + nums[r]
                
                # if the sum is too large
                if threeSum > 0:
                    r -= 1
                # if the sum is to small
                elif threeSum < 0:
                    l += 1
                
                else:
                    res.append([num, nums[l], nums[r]])
                    # We must move both values. If the numbers we have are -1, -1, 2
                    # the only way you would be able to move just one pointer and still get a 
                    # valid sum is if you come up with another identical set -1, -1, 2 and we 
                    # don't want to include duplicate solutions
                    l += 1
                    r -= 1
                    
                    # # skip over duplicate values
                    while nums[l] == nums[l - 1] and l < r:
                        l += 1
                        
        return res

"""
},

'29':{
'tag':
['math'],
'title':
""" 
Car Fleet
""",
'hint':
""" 
How many hours will it take?
""",
'note':
""" 
you just want to figure out how long it's going to take each card to get the destination. If a car behind another car takes less time the you know that it will be a part of the fleet in front of it

If a car will take more time than the car in front of it, then it will start its own fleet as it won't arrive at the same time as the fleet in front of it
""",
'problem': 
"""
There are n cars at given miles away from the starting mile 0, traveling to reach the mile target.

You are given two integer array position and speed, both of length n, where position[i] is the starting mile of the ith car and speed[i] is the speed of the ith car in miles per hour.

A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.

A car fleet is a car or cars driving next to each other. The speed of the car fleet is the minimum speed of any car in the fleet.

If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet.

Return the number of car fleets that will arrive at the destination.

Example 1:

Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]

Output: 3

Explanation:

    The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target.
    The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
    The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.


Example 1:

Input: target = 10, position = [1,4], speed = [3,2]

Output: 1

Explanation: The cars starting at 1 (speed 3) and 4 (speed 2) become a fleet, meeting each other at 10, the destination.

Example 2:

Input: target = 10, position = [4,1,0,7], speed = [2,2,1,1]

Output: 3

Explanation: The cars starting at 4 and 7 become a fleet at position 10. The cars starting at 1 and 0 never catch up to the car ahead of them. Thus, there are 3 car fleets that will arrive at the destination.

Constraints:

    n == position.length == speed.length.
    1 <= n <= 1000
    0 < target <= 1000
    0 < speed[i] <= 100
    0 <= position[i] < target
    All the values of position are unique.


""",
"code":
""" 
class Solution:
    def carFleet(self, target, position, speed):
        target = target
        pairs = [(position[i], speed[i]) for i in range(len(position))]
        fleets = 0
        
        # kp: evaluate the cars closest to the target first
        pairs.sort(reverse=True)
        pairs = pairs
        
        # represents the longest time it'll take a fleet to arrive (no fleet will be at target at time 0)
        slowest_fleet_time = 0
        
        for pos, speed in pairs:
            distance_from_target = target - pos
            hours_til_target = distance_from_target / speed
            # kp: if this car takes longer than the fleet in front of it
            if hours_til_target > slowest_fleet_time:
                fleets += 1
                slowest_fleet_time = hours_til_target
            else:
                # kp: if it takes the same time or shorter, then we know it is a part of the previous fleet
                pass
        
        return fleets
    

Solution().carFleet(10, [4, 1, 0, 7], [2, 2, 1, 1])

Example:
carFleet(10, [4, 1, 0, 7], [2, 2, 1, 1])
    target = 10
    pairs = [(4, 2), (1, 2), (0, 1), (7, 1)]
    fleets = 0
    # evaluate the cars closest to the target first
    pairs = [(7, 1), (4, 2), (1, 2), (0, 1)]
    slowest_fleet_time = 0
        
        pos: 7
        speed: 1
        distance_from_target = 3
        hours_til_target = 3.0
        # if this car takes longer than the fleet in front of it
        if hours_til_target > slowest_fleet_time:
        if 3.0 > 0: (T)
            fleets += 1
            slowest_fleet_time = hours_til_target
        
        pos: 4
        speed: 2
        distance_from_target = 6
        hours_til_target = 3.0
        # if this car takes longer than the fleet in front of it
        if hours_til_target > slowest_fleet_time:
        if 3.0 > 3.0: (F)
        else:
            # if it takes the same time or shorter, then we know it is a part of the previous fleet
        
        pos: 1
        speed: 2
        distance_from_target = 9
        hours_til_target = 4.5
        # if this car takes longer than the fleet in front of it
        if hours_til_target > slowest_fleet_time:
        if 4.5 > 3.0: (T)
            fleets += 1
            slowest_fleet_time = hours_til_target
        
        pos: 0
        speed: 1
        distance_from_target = 10
        hours_til_target = 10.0
        # if this car takes longer than the fleet in front of it
        if hours_til_target > slowest_fleet_time:
        if 10.0 > 4.5: (T)
            fleets += 1
            slowest_fleet_time = hours_til_target
"""
},

'30':{
'tag':
['stack', '84'],
'title':
""" 
Largest Rectangle in Histogram
""",
'hint':
""" 
this is a stack problem, think about what you can use the indices for
""",
'note':
""" 
Lesson: saving the indices of all values was key for this
""",
'problem': 
"""
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:

<a href="https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg" target="_blank">Graphic</a>

Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:

<a href="https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg" target="_blank">Graphic</a>

Input: heights = [2,4]
Output: 4


Constraints:

    1 <= heights.length <= 105
    0 <= heights[i] <= 104


""",
"code":
""" 
class Solution:
    
    def largestRectangleArea(self, heights):
        \"\"\" 
        place the first bar on the stack
        loop through remaining bars
        while the current bar is less than what's on the stack
            Pop off the value
            evaluate the distance between the current index and the index in its stack (which represents the start of its span)
            save the span_start of each bar
        
        add the current bar onto the stack with the span start of the last that wass removed, the span start should be the current index if none were removed
        
        if the current bar is  ==  or > Whatt's on the stack
            push the current value and its index to the stack
            
        once the for loop ends
        go backwards through the stack, popping off each value and evaluating its index versus the length of the list, calculating the new area
        
        \"\"\" 
        stack = [[heights[0], 0]]
        max_area = 0
        len_heights = len(heights)
        for i in range(1, len(heights)):
            height = heights[i]
            span_start = i
            
            while stack and (height < stack[-1][0]):
                previous_height, span_start = stack.pop()
                max_area = max(max_area, (i - span_start) * previous_height)
                    
            
            stack.append([height, span_start])
                                            
        while stack:
            # you actually don't need to pop, you can just write a for loop going through the stack since we won't be using it after this
            previous_height, span_start = stack.pop()
            max_area = max(max_area, (len_heights - span_start) * previous_height)                
                   
Solution().largestRectangleArea([2,4])

EXAMPLE:
largestRectangleArea([2, 1, 5, 6, 2, 3])
    stack = [[2, 0]]
    
    i: 1
    height = 1
    previous = [[2, 0]].pop()
    max_area = max(0, 2)
    max_area = 2
    
    [].append([1, 0])
    
    i: 2
    height = 5
    [[1, 0]].append([5, 2])
    
    i: 3
    height = 6
    [[1, 0], [5, 2]].append([6, 3])
    
    i: 4
    height = 2
    previous = [[1, 0], [5, 2], [6, 3]].pop()
    max_area = max(2, 6)
    max_area = 6
    
    previous = [[1, 0], [5, 2]].pop()
    max_area = max(6, 10)
    max_area = 10
    
    [[1, 0]].append([2, 2])
    
    i: 5
    height = 3
    [[1, 0], [2, 2]].append([3, 5])
    
    while stack:
    while [[1, 0], [2, 2], [3, 5]]: (T)
        previous = [[1, 0], [2, 2], [3, 5]].pop()
        max_area = max(10, 3)
        max_area = 10
        
        previous = [[1, 0], [2, 2]].pop()
        max_area = max(10, 8)
        max_area = 10
        
        previous = [[1, 0]].pop()
        max_area = max(10, 6)
        max_area = 10


"""
},

'31':{
'tag':
['algorithm'],
'title':
""" 
Binary Search
""",
'hint':
""" 
m = l + ((r - l) // 2)  # (l + r) // 2 can lead to overflow
""",
'note':
""" 

""",
'problem': 
"""
write the algorithm for a binary search
""",
"code":
""" 
class Solution:
    def search(self, nums, target):
        l, r = 0, len(nums) - 1

        while l <= r:
            m = l + ((r - l) // 2)  # (l + r) // 2 can lead to overflow
            if nums[m] > target:
                r = m - 1
            elif nums[m] < target:
                l = m + 1
            else:
                return m
        return -1
 
                   
Solution().search([2,1,5,6,2,3])
"""
},

'32':{
'tag':
['binary_search'],
'title':
""" 
Search 2D Matrix
""",
'hint':
""" 
double binary search
""",
'note':
""" 

""",
'problem': 
"""
You are given an m x n 2-D integer array matrix and an integer target.

    Each row in matrix is sorted in non-decreasing order.
    The first integer of every row is greater than the last integer of the previous row.

Return true if target exists within matrix or false otherwise.

Can you write a solution that runs in O(log(m * n)) time?

Example 1:

<a href="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/7ca61f56-00d4-4fa0-26cf-56809028ac00/public" target="_blank">Graphic</a>

Input: matrix = [[1,2,4,8],[10,11,12,13],[14,20,30,40]], target = 10

Output: true

Example 2:

<a href="https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/f25f2085-ce04-4447-9cee-f0a66c32a300/public" target="_blank">Graphic</a>

Input: matrix = [[1,2,4,8],[10,11,12,13],[14,20,30,40]], target = 15

Output: false

Constraints:

    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 100
    -10000 <= matrix[i][j], target <= 10000


""",
"code":
""" 
class Solution:
    def search(self, matrix, target):        
        \"\"\" 
        do a binary search on the rows
        starting with the middle row,
        if the target is both less than the start and final value in the row:
            search the top half of the matrix
        if the target is both greater than the first and last values in the row:
            search the bottom half of the matrix
        otherwise if the value is  in between:
            go on to do a binary search amid the array normally
            
        \"\"\"
        l, r = 0, len(matrix) - 1
        while l <= r:
            m = (l + r) // 2
            
            if matrix[m][0] < target and matrix[m][-1] < target:
                l = m + 1
            elif matrix[m][0] > target and matrix[m][-1] > target:
                r = m - 1
            else:
                left = 0
                right = len(matrix[m]) - 1
                while left <= right:
                    mid = (left + right) // 2
                    
                    if matrix[m][mid] < target:
                        left = mid + 1
                    elif matrix[m][mid] > target:
                        right = mid - 1
                    else:
                        print(matrix[m][mid])
                        return True
                
                return False
        return False
                   
# f = Solution().search([[1]], 10)
f = Solution().search([[1,2,4,8],[10,11,12,13],[14,20,30,40]], 10)
print(f)
"""
},

'33':{
'tag':
['875'],
'title':
""" 
Koko Eating Bananas
""",
'hint':
""" 
try to find the brute force solution first, then remember this is a binary problem
""",
'note':
""" 
find the K maximum possibility, which will be the maximum value in the list
K will be between 1 and the maximum so do a binary search on these values
figure out how many hours it'll take to eat when K = mid and depending on whether 
the value is too big or small use the binary search logic to try the next K value
""",
'problem': 
"""
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

 

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23

 

Constraints:

    1 <= piles.length <= 104
    piles.length <= h <= 109
    1 <= piles[i] <= 109


""",
"code":
""" 

"""
},

'34':{
'tag':
['153'],
'title':
""" 
Find Minimum in Rotated Sorted Array
""",
'hint':
""" 

""",
'note':
""" 

""",
'problem': 
"""
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

    [4,5,6,7,0,1,2] if it was rotated 4 times.
    [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

 

Example 1:

Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:

Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:

Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 

 

Constraints:

    n == nums.length
    1 <= n <= 5000
    -5000 <= nums[i] <= 5000
    All the integers of nums are unique.
    nums is sorted
""",
"code":
""" 
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        
        while left < right:
            mid = left + (right - left) // 2
            
            if nums[mid] < nums[right]:
                right = mid
            else:
                left = mid + 1
                
        return nums[left]
"""
},

'35':{
'tag':
['33'],
'title':
""" 
Search in Rotated Sorted Array
""",
'hint':
""" 
focus just on the left side and ask yourself what are the two cases that can exist for the left side and then solve
""",
'note':
""" 
You know there are two cases that will exist:
 - The left side of the array is organized/ordered
 - The left side of the array is not organized/ordered

if the left side is ordered (the number at the left index is less than the number at the middle index), check regularly:
 - if the target is larger than the middle (which means it is larger than all the numbers on the left side), look on the right side now
 - if the target is less than the left (which means it's number can't be between the left in 
 the middle), look on the right side now
otherwise move to the left
 
if the left side is not ordered (the left side is greater than the middle)
 - check if our target is greater than the left
 - check if our target is less than the middle
in either of these two cases that means our targets on the left side, if not moved to the right
""",
'problem': 
"""
You are given an array of length n which was originally sorted in ascending order. It has now been rotated between 1 and n times. For example, the array nums = [1,2,3,4,5,6] might become:

    [3,4,5,6,1,2] if it was rotated 4 times.
    [1,2,3,4,5,6] if it was rotated 6 times.

Given the rotated sorted array nums and an integer target, return the index of target within nums, or -1 if it is not present.

You may assume all elements in the sorted rotated array nums are unique,

A solution that runs in O(n) time is trivial, can you write an algorithm that runs in O(log n) time?

Example 1:

Input: nums = [3,4,5,6,1,2], target = 1

Output: 4

Example 2:

Input: nums = [3,5,6,0,1,2], target = 4

Output: -1

""",
"code":
""" 
def search(self, nums: List[int], target: int) -> int:
    l, r = 0, len(nums) - 1

    while l <= r:
        mid = (l + r) // 2
        if target == nums[mid]:
            return mid

        if nums[l] <= nums[mid]:
            if target > nums[mid] or target < nums[l]:
                l = mid + 1
            else:
                r = mid - 1
                
        else:
            if target < nums[mid] or target > nums[r]:
                r = mid - 1
            else:
                l = mid + 1
    return -1
"""
},

'36':{
'tag':
['4'],
'title':
""" 
Median of Two Sorted Arrays
""",
'hint':
""" 
the median is the middle number, or average of the middle two numbers, in an array
two pointer
""",
'note':
""" 

""",
'problem': 
"""
You are given two integer arrays nums1 and nums2 of size m and n respectively, where each is sorted in ascending order. Return the median value among all elements of the two arrays.

Your solution must run in O(log(m+n))O(log(m+n)) time.

Example 1:

Input: nums1 = [1,2], nums2 = [3]

Output: 2.0

Explanation: Among [1, 2, 3] the median is 2.

Example 2:

Input: nums1 = [1,3], nums2 = [2,4]

Output: 2.5

Explanation: Among [1, 2, 3, 4] the median is (2 + 3) / 2 = 2.5.
""",
"code":
""" 
# TWO POINTER SOLUTION
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        len1 = len(nums1)
        len2 = len(nums2)
        # no need to look past this point if both arrays were combined
        len_combined_halved = (len1 + len2) // 2 + 1
        i1 = 0
        i2 = 0
        median1 = 0
        median2 = 0

        # Find median.
        for _ in range(0, len_combined_halved):
            median2 = median1
            in_arr1_bounds = i1 < len1
            in_arr2_bounds = i2 < len2
            in_both_arr_bounds = in_arr1_bounds and in_arr2_bounds
            
            if in_both_arr_bounds:
                if nums1[i1] <= nums2[i2]:
                    median1 = nums1[i1]
                    i1 += 1
                else:
                    median1 = nums2[i2]
                    i2 += 1
            
            elif in_arr1_bounds:
                median1 = nums1[i1]
                i1 += 1
            
            elif in_arr2_bounds:
                median1 = nums2[i2]
                i2 += 1

        # Check if the sum of len1 and len2 is odd.
        if (len1 + len2) % 2 == 1:
            return float(median1)
        else:
            ans = float(median1) + float(median2)
            return ans / 2.0

f = Solution().findMedianSortedArrays([1, 2], [3, 4])
print(f)
"""
},

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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
'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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
'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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

'0':{
'tag':
[''],
'title':
""" 

""",
'hint':
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