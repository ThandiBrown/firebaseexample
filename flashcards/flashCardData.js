 
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
    }
}
	}

	export {
		fc_data
	}

	
