/**
 * Coding Problems Data for LeetCode-style Platform
 */

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Topic = 'Array' | 'String' | 'Hash Table' | 'Dynamic Programming' | 'Tree' | 'Graph' | 'Sorting' | 'Binary Search' | 'Linked List' | 'Stack' | 'Queue';

export interface TestCase {
  input: string;
  expected: string;
  hidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  topics: Topic[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  testCases: TestCase[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
    typescript: string;
  };
  solution?: string;
  hints?: string[];
}

export const codingProblems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', expected: '[0,1]' },
      { input: '[3,2,4]\n6', expected: '[1,2]' },
      { input: '[3,3]\n6', expected: '[0,1]' },
      { input: '[1,5,3,7,9]\n10', expected: '[1,3]', hidden: true },
      { input: '[0,4,3,0]\n0', expected: '[0,3]', hidden: true }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your code here
    
}`,
      python: `def twoSum(nums, target):
    # Write your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    // Write your code here
    
}`
    },
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
      'Use a hash map to store numbers you\'ve seen so far and their indices.',
      'For each number, check if target - number exists in the hash map.'
    ]
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    topics: ['String'],
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.'
    ],
    testCases: [
      { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
      { input: '["a"]', expected: '["a"]', hidden: true }
    ],
    starterCode: {
      javascript: `function reverseString(s) {
    // Write your code here
    
}`,
      python: `def reverseString(s):
    # Write your code here
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Write your code here
        
    }
};`,
      typescript: `function reverseString(s: string[]): void {
    // Write your code here
    
}`
    }
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    topics: ['String'],
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    testCases: [
      { input: '121', expected: 'true' },
      { input: '-121', expected: 'false' },
      { input: '10', expected: 'false' },
      { input: '0', expected: 'true', hidden: true },
      { input: '12321', expected: 'true', hidden: true }
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
    // Write your code here
    
}`,
      python: `def isPalindrome(x):
    # Write your code here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Write your code here
        
    }
};`,
      typescript: `function isPalindrome(x: number): boolean {
    // Write your code here
    
}`
    }
  },
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    topics: ['Array', 'Sorting'],
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should be returned by the function.`,
    examples: [
      {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]'
      },
      {
        input: 'nums1 = [1], m = 1, nums2 = [], n = 0',
        output: '[1]'
      }
    ],
    constraints: [
      'nums1.length == m + n',
      'nums2.length == n',
      '0 <= m, n <= 200',
      '1 <= m + n <= 200'
    ],
    testCases: [
      { input: '[1,2,3,0,0,0]\n3\n[2,5,6]\n3', expected: '[1,2,2,3,5,6]' },
      { input: '[1]\n1\n[]\n0', expected: '[1]' },
      { input: '[0]\n0\n[1]\n1', expected: '[1]', hidden: true }
    ],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
    // Write your code here
    
}`,
      python: `def merge(nums1, m, nums2, n):
    # Write your code here
    pass`,
      java: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // Write your code here
        
    }
};`,
      typescript: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    // Write your code here
    
}`
    }
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['String', 'Stack'],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    testCases: [
      { input: '()', expected: 'true' },
      { input: '()[]{}', expected: 'true' },
      { input: '(]', expected: 'false' },
      { input: '([)]', expected: 'false', hidden: true },
      { input: '{[]}', expected: 'true', hidden: true }
    ],
    starterCode: {
      javascript: `function isValid(s) {
    // Write your code here
    
}`,
      python: `def isValid(s):
    # Write your code here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        
    }
};`,
      typescript: `function isValid(s: string): boolean {
    // Write your code here
    
}`
    }
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topics: ['Array', 'Dynamic Programming'],
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1'
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
      { input: '[1]', expected: '1' },
      { input: '[5,4,-1,7,8]', expected: '23' },
      { input: '[-1]', expected: '-1', hidden: true },
      { input: '[-2,-1]', expected: '-1', hidden: true }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
    // Write your code here
    
}`,
      python: `def maxSubArray(nums):
    # Write your code here
    pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      typescript: `function maxSubArray(nums: number[]): number {
    // Write your code here
    
}`
    },
    hints: [
      'Try using dynamic programming approach (Kadane\'s Algorithm)',
      'Keep track of the maximum sum ending at each position'
    ]
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['String', 'Hash Table'],
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    testCases: [
      { input: 'abcabcbb', expected: '3' },
      { input: 'bbbbb', expected: '1' },
      { input: 'pwwkew', expected: '3' },
      { input: '', expected: '0', hidden: true },
      { input: 'au', expected: '2', hidden: true }
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
    // Write your code here
    
}`,
      python: `def lengthOfLongestSubstring(s):
    # Write your code here
    pass`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        
    }
};`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
    // Write your code here
    
}`
    },
    hints: [
      'Use sliding window technique',
      'Use a hash map to store characters and their indices'
    ]
  },
  {
    id: 'binary-tree-inorder',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    topics: ['Tree', 'Stack'],
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]'
      },
      {
        input: 'root = []',
        output: '[]'
      },
      {
        input: 'root = [1]',
        output: '[1]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    testCases: [
      { input: '[1,null,2,3]', expected: '[1,3,2]' },
      { input: '[]', expected: '[]' },
      { input: '[1]', expected: '[1]' }
    ],
    starterCode: {
      javascript: `function inorderTraversal(root) {
    // Write your code here
    
}`,
      python: `def inorderTraversal(root):
    # Write your code here
    pass`,
      java: `class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        // Write your code here
        
    }
};`,
      typescript: `function inorderTraversal(root: TreeNode | null): number[] {
    // Write your code here
    
}`
    }
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    topics: ['Dynamic Programming'],
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    testCases: [
      { input: '[1,2,5]\n11', expected: '3' },
      { input: '[2]\n3', expected: '-1' },
      { input: '[1]\n0', expected: '0' },
      { input: '[1,2,5]\n100', expected: '20', hidden: true }
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
    // Write your code here
    
}`,
      python: `def coinChange(coins, amount):
    # Write your code here
    pass`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your code here
        
    }
};`,
      typescript: `function coinChange(coins: number[], amount: number): number {
    // Write your code here
    
}`
    },
    hints: [
      'Think of the greedy approach. You always want to use the largest coin possible.',
      'Actually, greedy doesn\'t work. Use dynamic programming instead.',
      'Define dp[i] as the minimum number of coins needed to make amount i.'
    ]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topics: ['Dynamic Programming'],
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1+1, 2'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways to climb to the top: 1+1+1, 1+2, 2+1'
      }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    testCases: [
      { input: '2', expected: '2' },
      { input: '3', expected: '3' },
      { input: '5', expected: '8', hidden: true },
      { input: '10', expected: '89', hidden: true }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
    // Write your code here
    
}`,
      python: `def climbStairs(n):
    # Write your code here
    pass`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Write your code here
        
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Write your code here
        
    }
};`,
      typescript: `function climbStairs(n: number): number {
    // Write your code here
    
}`
    },
    hints: [
      'To reach stair n, you could come from stair n-1 or n-2.',
      'This is actually a Fibonacci sequence in disguise!'
    ]
  }
];

export function getProblemById(id: string): Problem | undefined {
  return codingProblems.find(p => p.id === id);
}

export function getProblemsByFilter(
  difficulty?: Difficulty,
  topic?: Topic,
  searchQuery?: string
): Problem[] {
  return codingProblems.filter(problem => {
    if (difficulty && problem.difficulty !== difficulty) return false;
    if (topic && !problem.topics.includes(topic)) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return problem.title.toLowerCase().includes(query) ||
             problem.description.toLowerCase().includes(query) ||
             problem.topics.some(t => t.toLowerCase().includes(query));
    }
    return true;
  });
}

export const allTopics: Topic[] = [
  'Array', 'String', 'Hash Table', 'Dynamic Programming', 
  'Tree', 'Graph', 'Sorting', 'Binary Search', 'Linked List', 'Stack', 'Queue'
];

export const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

