// Topic data store for algorithm learning paths
// Restructured to USACO Guide format with sections

export const topics = {
    'prefix-sums': {
        title: 'Prefix Sums',
        difficulty: 'Easy',
        description: 'Learn to efficiently calculate range sums using prefix sum arrays',

        sections: [
            {
                id: 'intro',
                title: 'Introduction',
                content: `Prefix sums (also called cumulative sums) are a powerful technique for efficiently answering range sum queries. Instead of recalculating sums every time, we precompute cumulative values.

## Key Idea

Given an array \`arr[]\`, we create a prefix array \`prefix[]\` where \`prefix[i]\` represents the sum of all elements from \`arr[0]\` to \`arr[i]\`.

This simple preprocessing step allows us to answer any range sum query in **O(1) time** instead of O(n).`
            },
            {
                id: 'explanation',
                title: 'Explanation',
                content: `## How It Works

### Building the Prefix Array

\`\`\`
prefix[0] = arr[0]
prefix[i] = prefix[i-1] + arr[i]  (for i > 0)
\`\`\`

### Answering Range Queries

To find the sum of elements from index \`l\` to \`r\`:

- If \`l == 0\`: answer = \`prefix[r]\`
- Otherwise: answer = \`prefix[r] - prefix[l-1]\`

## Example

Given array: \`[3, 1, 4, 1, 5, 9]\`

Prefix array: \`[3, 4, 8, 9, 14, 23]\`

**Query:** Sum from index 2 to 4
- Answer = \`prefix[4] - prefix[1]\` = 14 - 4 = **10**
- Verification: 4 + 1 + 5 = 10 ✓

## Time Complexity

- **Preprocessing:** O(n)
- **Query:** O(1)

This is a huge improvement over the naive O(n) per query approach!`
            },
            {
                id: 'implementation',
                title: 'Implementation',
                language: 'cpp',
                code: `#include <vector>
using namespace std;

// Build prefix sum array
vector<long long> buildPrefixSum(vector<int>& arr) {
    int n = arr.size();
    vector<long long> prefix(n);
    
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    
    return prefix;
}

// Query range sum from l to r (0-indexed)
long long rangeSum(vector<long long>& prefix, int l, int r) {
    if (l == 0) return prefix[r];
    return prefix[r] - prefix[l-1];
}

// Example usage
int main() {
    vector<int> arr = {3, 1, 4, 1, 5, 9};
    vector<long long> prefix = buildPrefixSum(arr);
    
    // Query sum from index 2 to 4
    cout << rangeSum(prefix, 2, 4) << endl;  // Output: 10
    
    return 0;
}`
            }
        ],

        problems: [
            {
                name: 'Range Sum Query - Immutable',
                url: 'https://leetcode.com/problems/range-sum-query-immutable/',
                difficulty: 'Easy',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Static Range Sum Queries',
                url: 'https://cses.fi/problemset/task/1646',
                difficulty: 'Easy',
                platform: 'CSES',
                solved: false
            },
            {
                name: 'Subarray Sum Equals K',
                url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
                difficulty: 'Medium',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Forest Queries',
                url: 'https://cses.fi/problemset/task/1652',
                difficulty: 'Hard',
                platform: 'CSES',
                solved: false
            }
        ]
    },

    'binary-search': {
        title: 'Binary Search',
        difficulty: 'Easy',
        description: 'Efficiently search sorted arrays and solve optimization problems',

        sections: [
            {
                id: 'intro',
                title: 'Introduction',
                content: `Binary search is a divide-and-conquer algorithm for finding an element in a sorted array by repeatedly dividing the search interval in half.

## Why Binary Search?

When you need to search for an element in a **sorted** array, binary search offers **O(log n)** time complexity, which is much better than the O(n) linear search.`
            },
            {
                id: 'explanation',
                title: 'Explanation',
                content: `## How It Works

1. Compare the target with the middle element
2. If target equals middle, we found it!
3. If target is less, search the left half
4. If target is greater, search the right half
5. Repeat until found or search space is empty

## Key Conditions

- Array must be **sorted**
- Need random access to elements

## Applications

- Finding elements in sorted arrays
- Finding boundaries (first/last occurrence)
- Binary search on answer (optimization problems)
- Finding insertion position

## Variants

- **Lower bound:** First position where value >= target
- **Upper bound:** First position where value > target
- **Binary search on answer:** Finding optimal value in range`
            },
            {
                id: 'implementation',
                title: 'Implementation',
                language: 'cpp',
                code: `#include <vector>
using namespace std;

// Standard binary search - returns index or -1
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) 
            return mid;
        else if (arr[mid] < target) 
            left = mid + 1;
        else 
            right = mid - 1;
    }
    
    return -1; // Not found
}

// Find first occurrence
int findFirst(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find last occurrence
int findLast(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}`
            }
        ],

        problems: [
            {
                name: 'Binary Search',
                url: 'https://leetcode.com/problems/binary-search/',
                difficulty: 'Easy',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Search Insert Position',
                url: 'https://leetcode.com/problems/search-insert-position/',
                difficulty: 'Easy',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Find Peak Element',
                url: 'https://leetcode.com/problems/find-peak-element/',
                difficulty: 'Medium',
                platform: 'LeetCode',
                solved: false
            }
        ]
    },

    'dynamic-programming': {
        title: 'Dynamic Programming',
        difficulty: 'Medium',
        description: 'Master the art of solving complex problems by breaking them into overlapping subproblems',

        sections: [
            {
                id: 'intro',
                title: 'Introduction',
                content: `Dynamic Programming (DP) is an algorithmic technique for solving optimization problems by breaking them down into simpler overlapping subproblems and storing their solutions to avoid redundant calculations.

## When to Use DP?

A problem can be solved using DP if it has:

1. **Optimal Substructure**: Optimal solution can be constructed from optimal solutions of subproblems
2. **Overlapping Subproblems**: Same subproblems are solved multiple times

## Example: Fibonacci Numbers

Naive recursion has O(2^n) time complexity, but with DP it becomes O(n)!`
            },
            {
                id: 'explanation',
                title: 'Explanation',
                content: `## DP Approaches

### 1. Top-Down (Memoization)

- Start from the original problem
- Recursively break it down
- Store results in a cache (hashtable/array)

### 2. Bottom-Up (Tabulation)

- Start from base cases
- Build up to the final solution
- Store results in a table (usually array)

## Steps to Solve DP Problems

1. **Define the state**: What does dp[i] represent?
2. **Write the recurrence relation**: How does dp[i] relate to previous states?
3. **Identify base cases**: What are the simplest subproblems?
4. **Decide the order of computation**: Which subproblems to solve first?
5. **Optimize space** (optional): Can we reduce memory usage?

## Common DP Patterns

- **Linear DP**: 1D array (Fibonacci, House Robber)
- **2D DP**: 2D array (Longest Common Subsequence, Edit Distance)
- **Knapsack**: Subset selection problems
- **DP on Trees**: Tree-based subproblems
- **Digit DP**: Counting numbers with constraints`
            },
            {
                id: 'implementation',
                title: 'Implementation',
                language: 'cpp',
                code: `#include <vector>
using namespace std;

// Top-Down (Memoization) - Fibonacci
int fibMemo(int n, vector<int>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
    return memo[n];
}

// Bottom-Up (Tabulation) - Fibonacci
int fibTab(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}

// Space Optimized - Fibonacci
int fibOptimized(int n) {
    if (n <= 1) return n;
    
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

// Classic DP: Coin Change
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i - coin >= 0) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}`
            }
        ],

        problems: [
            {
                name: 'Climbing Stairs',
                url: 'https://leetcode.com/problems/climbing-stairs/',
                difficulty: 'Easy',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Coin Change',
                url: 'https://leetcode.com/problems/coin-change/',
                difficulty: 'Medium',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Longest Increasing Subsequence',
                url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
                difficulty: 'Medium',
                platform: 'LeetCode',
                solved: false
            },
            {
                name: 'Edit Distance',
                url: 'https://cses.fi/problemset/task/1639',
                difficulty: 'Hard',
                platform: 'CSES',
                solved: false
            }
        ]
    }
};

// Get all topic slugs
export const getTopicSlugs = () => Object.keys(topics);

// Get topic by slug
export const getTopicBySlug = (slug) => topics[slug] || null;
