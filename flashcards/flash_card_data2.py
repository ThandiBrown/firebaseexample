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