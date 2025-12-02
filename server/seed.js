require('dotenv').config();
const mongoose = require('mongoose');
const Topic = require('./models/Topic');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cp-universe')
    .then(() => console.log('✅ Connected to MongoDB for Seeding Topics'))
    .catch(err => {
        console.error('❌ DB Connection Error:', err);
        process.exit(1);
    });

const topics = [
    // ================= BRONZE TIER (Beginner) =================
    {
        slug: "time-complexity",
        title: "Time Complexity",
        tier: "Bronze",
        tags: ["Basics", "Analysis"],
        summary: "Estimate if your code will pass the time limit (usually 1s ≈ 10^8 operations).",
        content: `
# Time Complexity
In competitive programming, the time limit is usually **1 second**. This corresponds to roughly $10^8$ operations.

## Common Complexities
- $N \\le 10$: $O(N!)$ or $O(2^N)$ (Recursion, Backtracking)
- $N \\le 500$: $O(N^3)$ (Floyd-Warshall, Matrix Multiplication)
- $N \\le 2000$: $O(N^2)$ (Bubble Sort, 2D DP)
- $N \\le 10^5$: $O(N \\log N)$ (Sorting, Binary Search, Segment Trees)
- $N \\le 10^6$: $O(N)$ (Two Pointers, Linear Scan)
- $N \\le 10^{18}$: $O(\\log N)$ or $O(1)$ (Math, Exponentiation)

## Big O Notation
Big O notation classifies algorithms by how their runtime grows relative to input size.
    `,
        codeTemplate: `// Analyze this loop\n// N = 10^5\nfor(int i = 0; i < n; i++) {\n    // O(1) operation\n}`,
        problems: [
            { name: "Weird Algorithm", url: "https://cses.fi/problemset/task/1068", difficulty: "Easy", platform: "CSES" },
            { name: "Missing Number", url: "https://cses.fi/problemset/task/1083", difficulty: "Easy", platform: "CSES" }
        ]
    },
    {
        slug: "rectangle-geometry",
        title: "Rectangle Geometry",
        tier: "Bronze",
        tags: ["Geometry"],
        summary: "Handling coordinates, calculating areas, and checking intersections of rectangles.",
        content: `
# Rectangle Geometry
Problems often involve 2D grids or coordinate planes.

## Key Concepts
1. **Area**: $Area = (x_2 - x_1) \\times (y_2 - y_1)$
2. **Intersection**: To find the intersection of two rectangles $A$ and $B$:
   - $x_{overlap} = \\max(0, \\min(A.x_2, B.x_2) - \\max(A.x_1, B.x_1))$
   - $y_{overlap} = \\max(0, \\min(A.y_2, B.y_2) - \\max(A.y_1, B.y_1))$
   - $Area = x_{overlap} \\times y_{overlap}$

## Coordinate Systems
Remember that in 2D arrays, \`grid[r][c]\` usually corresponds to \`y\` (row) and \`x\` (column), which is flipped from standard Cartesian coordinates.
    `,
        codeTemplate: `struct Rect {\n    int x1, y1, x2, y2;\n    int area() {\n        return (x2 - x1) * (y2 - y1);\n    }\n};`,
        problems: [
            { name: "Square Pasture", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=663", difficulty: "Easy", platform: "USACO" },
            { name: "Blocked Billboard", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=759", difficulty: "Easy", platform: "USACO" }
        ]
    },
    {
        slug: "simulation",
        title: "Simulation",
        tier: "Bronze",
        tags: ["Implementation"],
        summary: "Directly simulating the problem statement step-by-step.",
        content: `
# Simulation
Simulation problems ask you to do exactly what the statement says. There is no special algorithm required, but implementation can be tricky.

## Tips
1. Read the problem statement carefully.
2. Break down the process into smaller functions.
3. Watch out for edge cases (e.g., boundaries of a grid).
    `,
        codeTemplate: `void solve() {\n    // Implement the rules exactly as described\n}`,
        problems: [
            { name: "The Cow-Signal", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=665", difficulty: "Easy", platform: "USACO" },
            { name: "Speeding Ticket", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=568", difficulty: "Easy", platform: "USACO" }
        ]
    },

    // ================= SILVER TIER (Intermediate) =================
    {
        slug: "prefix-sums",
        title: "Prefix Sums",
        tier: "Silver",
        tags: ["Arrays", "Technique"],
        summary: "Calculate range sum queries in O(1) time after O(N) preprocessing.",
        content: `
# Prefix Sums
Given an array $A$, the prefix sum array $P$ is defined as:
$$P[i] = A[0] + A[1] + \\dots + A[i]$$

## Range Sum Query
To calculate the sum of a subarray from $L$ to $R$, we can use:
$$Sum(L, R) = P[R] - P[L-1]$$
This allows us to answer queries in $O(1)$ time.

## 2D Prefix Sums
For a 2D grid, let $P[i][j]$ be the sum of the rectangle from $(0,0)$ to $(i,j)$.
Sum of sub-rectangle $(r1, c1)$ to $(r2, c2)$:
$$Sum = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]$$
    `,
        codeTemplate: `// 1D Prefix Sum\nvector<long long> p(n + 1, 0);\nfor(int i = 0; i < n; i++) {\n    p[i+1] = p[i] + a[i];\n}`,
        problems: [
            { name: "Static Range Sum Queries", url: "https://cses.fi/problemset/task/1646", difficulty: "Easy", platform: "CSES" },
            { name: "Subarray Divisibility", url: "https://cses.fi/problemset/task/1662", difficulty: "Medium", platform: "CSES" },
            { name: "Forest Queries", url: "https://cses.fi/problemset/task/1652", difficulty: "Medium", platform: "CSES" }
        ]
    },
    {
        slug: "two-pointers",
        title: "Two Pointers",
        tier: "Silver",
        tags: ["Technique", "Arrays"],
        summary: "Iterating two pointers across an array to solve range or pair problems in O(N).",
        content: `
# Two Pointers
The Two Pointers method iterates two pointers across an array to find a target value or range.

## Common Use Cases
1. **Sum of Two Values**: Finding two numbers that sum to $X$ in a sorted array.
2. **Subarray Sum**: Finding a subarray with sum $X$ (only works for non-negative numbers).
3. **Merging**: Merging two sorted arrays.

## Complexity
Since each pointer moves at most $N$ times, the time complexity is $O(N)$.
    `,
        codeTemplate: `int l = 0, r = n - 1;\nwhile (l < r) {\n    int sum = arr[l] + arr[r];\n    if (sum == target) return true;\n    if (sum < target) l++;\n    else r--;\n}`,
        problems: [
            { name: "Sum of Two Values", url: "https://cses.fi/problemset/task/1640", difficulty: "Easy", platform: "CSES" },
            { name: "Subarray Sums I", url: "https://cses.fi/problemset/task/1660", difficulty: "Medium", platform: "CSES" }
        ]
    },
    {
        slug: "flood-fill",
        title: "Flood Fill",
        tier: "Silver",
        tags: ["Graphs", "Recursion"],
        summary: "Visiting all connected nodes in a grid (like the 'Paint Bucket' tool).",
        content: `
# Flood Fill
Flood fill is a BFS/DFS algorithm used on implicit graphs (grids) to find connected components.

## Implementation
1. Maintain a \`visited\` array.
2. For each cell, recursively visit its 4 neighbors (Up, Down, Left, Right).
3. Ensure you don't step out of bounds or visit obstacles.

## Complexity
$O(N \\times M)$ where $N, M$ are grid dimensions.
    `,
        codeTemplate: `void floodfill(int r, int c, int color) {\n    if(r < 0 || r >= N || c < 0 || c >= M) return;\n    if(visited[r][c] || grid[r][c] != color) return;\n    visited[r][c] = true;\n    floodfill(r+1, c, color);\n    floodfill(r-1, c, color);\n    floodfill(r, c+1, color);\n    floodfill(r, c-1, color);\n}`,
        problems: [
            { name: "Counting Rooms", url: "https://cses.fi/problemset/task/1192", difficulty: "Easy", platform: "CSES" },
            { name: "Icy Perimeter", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=895", difficulty: "Medium", platform: "USACO" }
        ]
    },
    {
        slug: "binary-search",
        title: "Binary Search",
        tier: "Silver",
        tags: ["Searching", "Logarithmic"],
        summary: "Efficiently find an element or answer in O(log N).",
        content: `
# Binary Search
Binary search reduces the search space by half at each step.

## Binary Search on Answer
Sometimes we want to find the **maximum** or **minimum** value $X$ such that a condition \`check(X)\` is true.
- If \`check(X)\` is true, then \`check(X-1)\` might also be true (monotonicity).
- We can binary search for the boundary.

## Template
\`\`\`cpp
int l = 0, r = n - 1;
while (l <= r) {
    int mid = l + (r - l) / 2;
    if (check(mid)) ans = mid, l = mid + 1;
    else r = mid - 1;
}
\`\`\`
    `,
        codeTemplate: `bool check(int x) {\n    // TODO: Return true if x is valid\n}\n\nvoid solve() {\n    int l = 0, r = 1e9;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(check(mid)) l = mid + 1;\n        else r = mid - 1;\n    }\n}`,
        problems: [
            { name: "Binary Search", url: "https://leetcode.com/problems/binary-search/", difficulty: "Easy", platform: "LeetCode" },
            { name: "Array Division", url: "https://cses.fi/problemset/task/1085", difficulty: "Medium", platform: "CSES" },
            { name: "Factory Machines", url: "https://cses.fi/problemset/task/1620", difficulty: "Medium", platform: "CSES" }
        ]
    },

    // ================= GOLD TIER (Advanced) =================
    {
        slug: "dynamic-programming",
        title: "Dynamic Programming",
        tier: "Gold",
        tags: ["DP", "Optimization"],
        summary: "Breaking complex problems into simpler subproblems and storing results.",
        content: `
# Dynamic Programming
DP is "recursion with memoization".

## Key Components
1. **State**: What variables define the subproblem? (e.g., index $i$, capacity $w$)
2. **Transition**: $dp[i] = \\max(dp[i-1], dp[i-2] + cost)$
3. **Base Case**: $dp[0] = 0$

## 0/1 Knapsack
Given weights and values, maximize value with capacity $W$.
$dp[w] = \\max(dp[w], dp[w - weight] + value)$
    `,
        codeTemplate: `// Classic Knapsack\nfor(int i = 0; i < n; i++) {\n    for(int w = W; w >= weights[i]; w--) {\n        dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);\n    }\n}`,
        problems: [
            { name: "Minimizing Coins", url: "https://cses.fi/problemset/task/1634", difficulty: "Medium", platform: "CSES" },
            { name: "Book Shop", url: "https://cses.fi/problemset/task/1158", difficulty: "Medium", platform: "CSES" },
            { name: "Coin Combinations I", url: "https://cses.fi/problemset/task/1635", difficulty: "Medium", platform: "CSES" }
        ]
    },
    {
        slug: "dijkstra",
        title: "Shortest Paths (Dijkstra)",
        tier: "Gold",
        tags: ["Graphs", "Shortest Path"],
        summary: "Finding shortest paths in weighted graphs with non-negative weights.",
        content: `
# Dijkstra's Algorithm
Uses a priority queue to greedily select the closest unvisited node.

## Complexity
$O(E \\log V)$ using a binary heap (priority queue).

## Implementation
1. Initialize distances to $\\infty$, source to 0.
2. Push \`{0, source}\` to PQ.
3. While PQ is not empty:
   - Pop node $u$ with smallest distance.
   - For every neighbor $v$ with weight $w$:
     - If $dist[u] + w < dist[v]$, update $dist[v]$ and push to PQ.
    `,
        codeTemplate: `priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;\ndist[start] = 0;\npq.push({0, start});\n\nwhile(!pq.empty()) {\n    int u = pq.top().second;\n    long long d = pq.top().first;\n    pq.pop();\n    if(d > dist[u]) continue;\n    for(auto edge : adj[u]) {\n        if(dist[u] + edge.weight < dist[edge.to]) {\n            dist[edge.to] = dist[u] + edge.weight;\n            pq.push({dist[edge.to], edge.to});\n        }\n    }\n}`,
        problems: [
            { name: "Shortest Routes I", url: "https://cses.fi/problemset/task/1671", difficulty: "Medium", platform: "CSES" },
            { name: "Flight Discount", url: "https://cses.fi/problemset/task/1195", difficulty: "Hard", platform: "CSES" }
        ]
    },
    {
        slug: "dsu",
        title: "Disjoint Set Union (DSU)",
        tier: "Gold",
        tags: ["Data Structures", "Graphs"],
        summary: "Efficiently managing disjoint sets (Union and Find operations).",
        content: `
# Disjoint Set Union
Also known as Union-Find. Supports two operations in nearly $O(1)$ time:
1. **Find(x)**: Returns the representative of the set containing $x$.
2. **Union(x, y)**: Merges the sets containing $x$ and $y$.

## Optimizations
1. **Path Compression**: Point nodes directly to the root during Find.
2. **Union by Size/Rank**: Attach the smaller tree to the larger tree.
    `,
        codeTemplate: `int parent[100005];\nint find(int x) {\n    if(x == parent[x]) return x;\n    return parent[x] = find(parent[x]);\n}\n\nvoid unite(int a, int b) {\n    a = find(a); b = find(b);\n    if(a != b) parent[b] = a;\n}`,
        problems: [
            { name: "Road Construction", url: "https://cses.fi/problemset/task/1676", difficulty: "Medium", platform: "CSES" },
            { name: "Closing the Farm", url: "http://www.usaco.org/index.php?page=viewproblem2&cpid=644", difficulty: "Medium", platform: "USACO" }
        ]
    },
    {
        slug: "modular-arithmetic",
        title: "Modular Arithmetic",
        tier: "Gold",
        tags: ["Math", "Number Theory"],
        summary: "Operations under a modulus (usually 10^9 + 7).",
        content: `
# Modular Arithmetic
In CP, we often output answers modulo $M = 10^9 + 7$.

## Rules
- $(a + b) \\pmod M = ((a \\pmod M) + (b \\pmod M)) \\pmod M$
- $(a - b) \\pmod M = ((a \\pmod M) - (b \\pmod M) + M) \\pmod M$
- $(a \\times b) \\pmod M = ((a \\pmod M) \\times (b \\pmod M)) \\pmod M$
- Division requires **Modular Inverse** (Fermat's Little Theorem).

## Modular Exponentiation
Calculating $a^b \\pmod M$ in $O(\\log b)$ time.
    `,
        codeTemplate: `long long binpow(long long a, long long b) {\n    long long res = 1;\n    while (b > 0) {\n        if (b & 1) res = res * a % MOD;\n        a = a * a % MOD;\n        b >>= 1;\n    }\n    return res;\n}`,
        problems: [
            { name: "Exponentiation", url: "https://cses.fi/problemset/task/1095", difficulty: "Easy", platform: "CSES" },
            { name: "Counting Divisors", url: "https://cses.fi/problemset/task/1713", difficulty: "Medium", platform: "CSES" }
        ]
    },

    // ================= PLATINUM TIER (Expert) =================
    {
        slug: "segment-tree",
        title: "Segment Trees",
        tier: "Platinum",
        tags: ["Data Structures", "Advanced"],
        summary: "Range queries and point updates in O(log N).",
        content: `
# Segment Trees
A Segment Tree allows answering range queries over an array effectively, while still being flexible enough to allow modifying the array.

## Operations
1. **Build**: $O(N)$
2. **Update**: Modify element at index $i$ in $O(\\log N)$.
3. **Query**: Find sum/min/max in range $[L, R]$ in $O(\\log N)$.

## Structure
It is a binary tree where each node represents an interval. The root represents $[0, N-1]$.
    `,
        codeTemplate: `// Standard Range Sum Segment Tree\nvoid update(int v, int tl, int tr, int pos, int new_val) {\n    if (tl == tr) {\n        t[v] = new_val;\n    } else {\n        int tm = (tl + tr) / 2;\n        if (pos <= tm) update(v*2, tl, tm, pos, new_val);\n        else update(v*2+1, tm+1, tr, pos, new_val);\n        t[v] = t[v*2] + t[v*2+1];\n    }\n}`,
        problems: [
            { name: "Dynamic Range Sum Queries", url: "https://cses.fi/problemset/task/1648", difficulty: "Medium", platform: "CSES" },
            { name: "Range Update Queries", url: "https://cses.fi/problemset/task/1651", difficulty: "Hard", platform: "CSES" }
        ]
    }
];

const seedTopics = async () => {
    try {
        await Topic.deleteMany({});
        console.log('🧹 Cleared existing topics...');

        await Topic.insertMany(topics);
        console.log(`🌱 Successfully seeded ${topics.length} topics!`);

        mongoose.connection.close();
        console.log('👋 Connection closed');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedTopics();
