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