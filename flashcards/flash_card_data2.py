flashcard_data = {


'1':{
'tag':
[''],
'title':
""" 
Diameter of Binary Tree
""",
'hint':
""" 

""",
'note':
""" 
(1) save the distance/path between the longest node to the left and the longest node to the right at each root
    1
  2   3
the longest path is 2: 2 ---> 1 ---> 3
(2) pick which of the paths are longest (the one to the left or right), return that + 1 to account for the current node
""",
'problem': 
"""
<a href="https://leetcode.com/problems/diameter-of-binary-tree/" target="_blank">Diameter of Binary Tree</a>
""",
"code":
""" 
def diameterOfBinaryTree(root):
	max_diameter = 0

	def get_path_len(root):
		if not root: return 0

		left_path_len = get_path_len(root.left)
		right_path_len = get_path_len(root.right)

		nonlocal max_diameter
		max_diameter = max(left_path_len + right_path_len, max_diameter)

		return 1 + max(left_path_len, right_path_len)

	get_path_len(root)
	return max_diameter
        
"""
},

'2':{
'tag':
[''],
'title':
""" 
Balanced Binary Tree
""",
'hint':
""" 

""",
'note':
""" 
height of a node:
- maximum(height_of_left subtree, height_of_right subtree) + 1 (current node)

check for balance:
- check the height between the subtrees
""",
'problem': 
"""
<a href="https://leetcode.com/problems/balanced-binary-tree/" target="_blank">Problem</a>
""",
"code":
""" 
def isBalanced(self, root: Optional[TreeNode]) -> bool:
	def dfs(root):
		if not root:
			return [True, 0]

		left, right = dfs(root.left), dfs(root.right)
		
		left_is_balanced = left[0]
		right_is_balanced = right[0]
		left_height = left[1]
		right_height = right[1]

		balanced = abs(left_height - right_height) <= 1 and left_is_balanced and right_is_balanced

		return [balanced, 1 + max(left_height, right_height)]

	return dfs(root)[0]
"""
},

'3':{
'tag':
[''],
'title':
""" 
Same Tree
""",
'hint':
""" 

""",
'note':
""" 
check the values of the current note and left and right subtrees
return false if the values do not match
make sure to consider null
""",
'problem': 
"""
<a href="https://leetcode.com/problems/same-tree/description/" target="_blank">Same Tree</a>
""",
"code":
""" 
def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
	# both null
	if not p and not q:
		return True
	# only one is null
	elif not p or not q:
		return False
	
	return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)

"""
},
'4':{
'tag':
[''],
'title':
""" 
Subtree of Another
""",
'hint':
""" 

""",
'note':
""" 
check at each node if it is the same tree as the subtree
create an internal same tree method
""",
'problem': 
"""
<a href="https://leetcode.com/problems/subtree-of-another-tree/description/" target="_blank">Problem</a>
""",
"code":
""" 
def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
	if not subRoot:
		return True
	if not root:
		return False
	

	def is_same_tree(r1, r2):

		if (not r1 and not r2) or \
		(r1 and r2 and r1.val == r2.val and is_same_tree(r1.left, r2.left) and is_same_tree(r1.right, r2.right)):
			return True

		return False
	
	if root.val == subRoot.val and is_same_tree(root, subRoot):
		return True
        
	return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)
"""
},

'5':{
'tag':
[''],
'title':
""" 
Lowest Common Ancestor Of binary search tree
""",
'hint':
""" 

""",
'note':
""" 
a binary search tree is such that all values to the right are greater than the root, in all values to the left are less than
find where the "split" is
when one value is greater than the root while the other value is less than or equal to the root, you have found the LCA
"they have split at this ancestor"
""",
'problem': 
"""
<a href='https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/"'target="_blank">Problem</a>
""",
"code":
""" 
def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
	if (p.val <= root.val and q.val >= root.val) or (p.val >= root.val and q.val <= root.val):
		return root

	if p.val < root.val:
		return self.lowestCommonAncestor(root.left, p, q)
	if p.val > root.val:
		return self.lowestCommonAncestor(root.right, p, q)
	
"""
},

'6':{
'tag':
[''],
'title':
""" 
Binary Tree Level Order Traversal
""",
'hint':
""" 

""",
'note':
""" 
DFS
- nested function, result at top
- pass the level depth down
- add value to the result at the expected level, considering indexing

BFS
- while queue, for loop inside which
- for whatever on the Q, pop it off and add its children to the queue\
- by the time you're done with the for loop, you have handled every node at that level
[3, 9, 20, 8, 12, 15, 17]
while [3], for loop [3]
while [9, 20], for loop [9, 20]
9 ---> [20, 8, 12]
20 ---> [8, 12, 15, 17]
by the time you're done with this for loop, you have handled all of level two, so increment to level three, and you know the remaining four is for level three and so on
""",
'problem': 
"""
<a href="https://leetcode.com/problems/binary-tree-level-order-traversal/description/" target="_blank">Problem</a>
""",
"code":
""" 
def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
	res = []

	def dfs(node, depth):
		if not node:
			return None
		if len(res) == depth:
			res.append([])
		
		res[depth].append(node.val)
		dfs(node.left, depth + 1)
		dfs(node.right, depth + 1)
	
	dfs(root, 0)
	return res

def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
	res = []

	q = collections.deque()
	q.append(root)

	while q:
		qLen = len(q)
		level = []
		for i in range(qLen):
			node = q.popleft()
			if node:
				level.append(node.val)
				q.append(node.left)
				q.append(node.right)
		if level:
			res.append(level)
			
	return res
"""
},

'7':{
'tag':
[''],
'title':
""" 
Binary Tree Right Side View
""",
'hint':
""" 

""",
'note':
""" 
utilize level order traversal answer
DFS
when you first reach a new depth, save that value as the result
the trick is however to dfs to the right node first

BFS
as you pop from your for loop save (via variable assignment) all non-null values. the last value you save, will be the most right value on that tree for that level
""",
'problem': 
"""
<a href="https://leetcode.com/problems/binary-tree-right-side-view/description/" target="_blank">Problem</a>
""",
"code":
""" 
def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
	res = []

	def dfs(node, depth):
		if not node:
			return None
		if depth == len(res):
			res.append(node.val)
		
		dfs(node.right, depth + 1)
		dfs(node.left, depth + 1)
	
	dfs(root, 0)
	return res
	
def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
	res = []
	q = deque([root])

	while q:
		rightSide = None
		qLen = len(q)

		for i in range(qLen):
			node = q.popleft()
			if node:
				rightSide = node
				q.append(node.left)
				q.append(node.right)
		if rightSide:
			res.append(rightSide.val)
	return res
"""
},

'8':{
'tag':
[''],
'title':
""" 
Count Good Nodes in Binary Tree
""",
'hint':
""" 

""",
'note':
""" 
track the maximum value you seen so far at each level
if the current node is greater than or equal to any node you seen so far on this path, it is a good node
make sure to update the maximum
""",
'problem': 
"""
<a href="https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/" target="_blank">Problem</a>
""",
"code":
""" 
def goodNodes(self, root: TreeNode) -> int:
	
	def dfs(root, maxSeen):

		if not root: return 0

		goodCount = int(root.val >= maxSeen)

		maxSeen = max(maxSeen, root.val)
		
		return dfs(root.left, maxSeen) + dfs(root.right, maxSeen) + goodCount

	return dfs(root, float("-inf"))
"""
},

'9':{
'tag':
[''],
'title':
""" 
Valid Binary Search Tree
""",
'hint':
""" 

""",
'note':
""" 
<a href="https://www.youtube.com/watch?v=s6ATEkipzow&ab_channel=NeetCode" target="_blank">6:15 visual</a>

you need to keep track of (1)what value must be greater than and (2)what value it must be less than
you also pass what those left and right/lower and upper boundaries are from the parent depending on which direction you are moving down the tree
""",
'problem': 
"""
<a href="https://leetcode.com/problems/validate-binary-search-tree/description/" target="_blank">Problem</a>
""",
"code":
""" 
def valid(node, left, right):
	if not node:
		return True
	
	if not (left < node.val < right):
		return False

	return valid(node.left, left, node.val) and valid(node.right, node.val, right)

return valid(root, float("-inf"), float("inf"))
"""
},

'10':{
'tag':
[''],
'title':
""" 
Kth Smallest Integer in BST
""",
'hint':
""" 

""",
'note':
""" 
if you want to print/visit a BST in sorted order, you doing an inorder traversal:
	dfs(node.left)
	node.val
	dfs(node.right)
reverse order would be:
	dfs(node.right)
	node.val
	dfs(node.left)
use a BST with values [3,1,4,null,2,null,null] to see

visit through the tree in order, save the value along the way, index the value that you want
or for more constant space, every time you come back from visiting the leftmost note, decrease the overall count until you reach count == 0
""",
'problem': 
"""
<a href="https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/" target="_blank">Problem</a>
""",
"code":
""" 
def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
	arr = []

	def dfs(node):
		if not node:
			return
		
		dfs(node.left)
		arr.append(node.val)
		dfs(node.right)
	
	dfs(root)
	return arr[k - 1]

def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
	cnt = k
	res = root.val

	def dfs(node):
		nonlocal cnt, res
		if not node:
			return
		
		dfs(node.left)
		cnt -= 1
		if cnt == 0:
			res = node.val
			return
		dfs(node.right)
	
	dfs(root)
	return res
"""
},

'11':{
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