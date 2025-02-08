 
	function fc_data() {
		return {
    "1": {
        "tag": [
            ""
        ],
        "title": "Diameter of Binary Tree",
        "hint": null,
        "note": "(1) save the distance/path between the longest node to the left and the longest node to the right at each root\n    1\n  2   3\nthe longest path is 2: 2 ---> 1 ---> 3\n(2) pick which of the paths are longest (the one to the left or right), return that + 1 to account for the current node",
        "problem": "<a href=\"https://leetcode.com/problems/diameter-of-binary-tree/\" target=\"_blank\">Diameter of Binary Tree</a>",
        "code": " \ndef diameterOfBinaryTree(root):\n\tmax_diameter = 0\n\n\tdef get_path_len(root):\n\t\tif not root: return 0\n\n\t\tleft_path_len = get_path_len(root.left)\n\t\tright_path_len = get_path_len(root.right)\n\n\t\tnonlocal max_diameter\n\t\tmax_diameter = max(left_path_len + right_path_len, max_diameter)\n\n\t\treturn 1 + max(left_path_len, right_path_len)\n\n\tget_path_len(root)\n\treturn max_diameter\n        \n"
    },
    "2": {
        "tag": [
            ""
        ],
        "title": "Balanced Binary Tree",
        "hint": null,
        "note": "height of a node:\n- maximum(height_of_left subtree, height_of_right subtree) + 1 (current node)\n\ncheck for balance:\n- check the height between the subtrees",
        "problem": "<a href=\"https://leetcode.com/problems/balanced-binary-tree/\" target=\"_blank\">Problem</a>",
        "code": " \ndef isBalanced(self, root: Optional[TreeNode]) -> bool:\n\tdef dfs(root):\n\t\tif not root:\n\t\t\treturn [True, 0]\n\n\t\tleft, right = dfs(root.left), dfs(root.right)\n\t\t\n\t\tleft_is_balanced = left[0]\n\t\tright_is_balanced = right[0]\n\t\tleft_height = left[1]\n\t\tright_height = right[1]\n\n\t\tbalanced = abs(left_height - right_height) <= 1 and left_is_balanced and right_is_balanced\n\n\t\treturn [balanced, 1 + max(left_height, right_height)]\n\n\treturn dfs(root)[0]\n"
    },
    "3": {
        "tag": [
            ""
        ],
        "title": "Same Tree",
        "hint": null,
        "note": "check the values of the current note and left and right subtrees\nreturn false if the values do not match\nmake sure to consider null",
        "problem": "<a href=\"https://leetcode.com/problems/same-tree/description/\" target=\"_blank\">Same Tree</a>",
        "code": " \ndef isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n\t# both null\n\tif not p and not q:\n\t\treturn True\n\t# only one is null\n\telif not p or not q:\n\t\treturn False\n\t\n\treturn p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)\n\n"
    },
    "4": {
        "tag": [
            ""
        ],
        "title": "Subtree of Another",
        "hint": null,
        "note": "check at each node if it is the same tree as the subtree\ncreate an internal same tree method",
        "problem": "<a href=\"https://leetcode.com/problems/subtree-of-another-tree/description/\" target=\"_blank\">Problem</a>",
        "code": " \ndef isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n\tif not subRoot:\n\t\treturn True\n\tif not root:\n\t\treturn False\n\t\n\n\tdef is_same_tree(r1, r2):\n\n\t\tif (not r1 and not r2) or \t\t(r1 and r2 and r1.val == r2.val and is_same_tree(r1.left, r2.left) and is_same_tree(r1.right, r2.right)):\n\t\t\treturn True\n\n\t\treturn False\n\t\n\tif root.val == subRoot.val and is_same_tree(root, subRoot):\n\t\treturn True\n        \n\treturn self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)\n"
    },
    "5": {
        "tag": [
            ""
        ],
        "title": "Lowest Common Ancestor Of binary search tree",
        "hint": null,
        "note": "a binary search tree is such that all values to the right are greater than the root, in all values to the left are less than\nfind where the \"split\" is\nwhen one value is greater than the root while the other value is less than or equal to the root, you have found the LCA\n\"they have split at this ancestor\"",
        "problem": "<a href='https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/\"'target=\"_blank\">Problem</a>",
        "code": " \ndef lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n\tif (p.val <= root.val and q.val >= root.val) or (p.val >= root.val and q.val <= root.val):\n\t\treturn root\n\n\tif p.val < root.val:\n\t\treturn self.lowestCommonAncestor(root.left, p, q)\n\tif p.val > root.val:\n\t\treturn self.lowestCommonAncestor(root.right, p, q)\n\t\n"
    },
    "6": {
        "tag": [
            ""
        ],
        "title": "Binary Tree Level Order Traversal",
        "hint": null,
        "note": "DFS\n- nested function, result at top\n- pass the level depth down\n- add value to the result at the expected level, considering indexing\n\nBFS\n- while queue, for loop inside which\n- for whatever on the Q, pop it off and add its children to the queue- by the time you're done with the for loop, you have handled every node at that level\n[3, 9, 20, 8, 12, 15, 17]\nwhile [3], for loop [3]\nwhile [9, 20], for loop [9, 20]\n9 ---> [20, 8, 12]\n20 ---> [8, 12, 15, 17]\nby the time you're done with this for loop, you have handled all of level two, so increment to level three, and you know the remaining four is for level three and so on",
        "problem": "<a href=\"https://leetcode.com/problems/binary-tree-level-order-traversal/description/\" target=\"_blank\">Problem</a>",
        "code": " \ndef levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n\tres = []\n\n\tdef dfs(node, depth):\n\t\tif not node:\n\t\t\treturn None\n\t\tif len(res) == depth:\n\t\t\tres.append([])\n\t\t\n\t\tres[depth].append(node.val)\n\t\tdfs(node.left, depth + 1)\n\t\tdfs(node.right, depth + 1)\n\t\n\tdfs(root, 0)\n\treturn res\n\ndef levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n\tres = []\n\n\tq = collections.deque()\n\tq.append(root)\n\n\twhile q:\n\t\tqLen = len(q)\n\t\tlevel = []\n\t\tfor i in range(qLen):\n\t\t\tnode = q.popleft()\n\t\t\tif node:\n\t\t\t\tlevel.append(node.val)\n\t\t\t\tq.append(node.left)\n\t\t\t\tq.append(node.right)\n\t\tif level:\n\t\t\tres.append(level)\n\t\t\t\n\treturn res\n"
    },
    "7": {
        "tag": [
            ""
        ],
        "title": "Binary Tree Right Side View",
        "hint": null,
        "note": "utilize level order traversal answer\nDFS\nwhen you first reach a new depth, save that value as the result\nthe trick is however to dfs to the right node first\n\nBFS\nas you pop from your for loop save (via variable assignment) all non-null values. the last value you save, will be the most right value on that tree for that level",
        "problem": "<a href=\"https://leetcode.com/problems/binary-tree-right-side-view/description/\" target=\"_blank\">Problem</a>",
        "code": " \ndef rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n\tres = []\n\n\tdef dfs(node, depth):\n\t\tif not node:\n\t\t\treturn None\n\t\tif depth == len(res):\n\t\t\tres.append(node.val)\n\t\t\n\t\tdfs(node.right, depth + 1)\n\t\tdfs(node.left, depth + 1)\n\t\n\tdfs(root, 0)\n\treturn res\n\t\ndef rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n\tres = []\n\tq = deque([root])\n\n\twhile q:\n\t\trightSide = None\n\t\tqLen = len(q)\n\n\t\tfor i in range(qLen):\n\t\t\tnode = q.popleft()\n\t\t\tif node:\n\t\t\t\trightSide = node\n\t\t\t\tq.append(node.left)\n\t\t\t\tq.append(node.right)\n\t\tif rightSide:\n\t\t\tres.append(rightSide.val)\n\treturn res\n"
    },
    "8": {
        "tag": [
            ""
        ],
        "title": "Count Good Nodes in Binary Tree",
        "hint": null,
        "note": "track the maximum value you seen so far at each level\nif the current node is greater than or equal to any node you seen so far on this path, it is a good node\nmake sure to update the maximum",
        "problem": "<a href=\"https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/\" target=\"_blank\">Problem</a>",
        "code": " \ndef goodNodes(self, root: TreeNode) -> int:\n\t\n\tdef dfs(root, maxSeen):\n\n\t\tif not root: return 0\n\n\t\tgoodCount = int(root.val >= maxSeen)\n\n\t\tmaxSeen = max(maxSeen, root.val)\n\t\t\n\t\treturn dfs(root.left, maxSeen) + dfs(root.right, maxSeen) + goodCount\n\n\treturn dfs(root, float(\"-inf\"))\n"
    },
    "9": {
        "tag": [
            ""
        ],
        "title": "Valid Binary Search Tree",
        "hint": null,
        "note": "<a href=\"https://www.youtube.com/watch?v=s6ATEkipzow&ab_channel=NeetCode\" target=\"_blank\">6:15 visual</a>\n\nyou need to keep track of (1)what value must be greater than and (2)what value it must be less than\nyou also pass what those left and right/lower and upper boundaries are from the parent depending on which direction you are moving down the tree",
        "problem": "<a href=\"https://leetcode.com/problems/validate-binary-search-tree/description/\" target=\"_blank\">Problem</a>",
        "code": " \ndef valid(node, left, right):\n\tif not node:\n\t\treturn True\n\t\n\tif not (left < node.val < right):\n\t\treturn False\n\n\treturn valid(node.left, left, node.val) and valid(node.right, node.val, right)\n\nreturn valid(root, float(\"-inf\"), float(\"inf\"))\n"
    },
    "10": {
        "tag": [
            ""
        ],
        "title": "Kth Smallest Integer in BST",
        "hint": null,
        "note": "if you want to print/visit a BST in sorted order, you doing an inorder traversal:\n\tdfs(node.left)\n\tnode.val\n\tdfs(node.right)\nreverse order would be:\n\tdfs(node.right)\n\tnode.val\n\tdfs(node.left)\nuse a BST with values [3,1,4,null,2,null,null] to see\n\nvisit through the tree in order, save the value along the way, index the value that you want\nor for more constant space, every time you come back from visiting the leftmost note, decrease the overall count until you reach count == 0",
        "problem": "<a href=\"https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/\" target=\"_blank\">Problem</a>",
        "code": " \ndef kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n\tarr = []\n\n\tdef dfs(node):\n\t\tif not node:\n\t\t\treturn\n\t\t\n\t\tdfs(node.left)\n\t\tarr.append(node.val)\n\t\tdfs(node.right)\n\t\n\tdfs(root)\n\treturn arr[k - 1]\n\ndef kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n\tcnt = k\n\tres = root.val\n\n\tdef dfs(node):\n\t\tnonlocal cnt, res\n\t\tif not node:\n\t\t\treturn\n\t\t\n\t\tdfs(node.left)\n\t\tcnt -= 1\n\t\tif cnt == 0:\n\t\t\tres = node.val\n\t\t\treturn\n\t\tdfs(node.right)\n\t\n\tdfs(root)\n\treturn res\n"
    },
    "11": {
        "tag": [
            ""
        ],
        "title": null,
        "hint": null,
        "note": null,
        "problem": null,
        "code": null
    }
}
	}

	export {
		fc_data
	}

	
