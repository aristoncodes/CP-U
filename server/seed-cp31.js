require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cp-universe')
    .then(() => console.log('✅ Connected to MongoDB for CP-31 Seeding'))
    .catch(err => { console.error(err); process.exit(1); });

// CP-31 Sheet: Complete list of Codeforces problems (800-1900 rating)
const cp31Problems = [
    // Rating 800 (31 problems)
    { difficulty: 800, title: "Halloumi Boxes", url: "https://codeforces.com/problemset/problem/1903/A", tags: ['greedy', 'sort'] },
    { difficulty: 800, title: "Line Trip", url: "https://codeforces.com/problemset/problem/1901/A", tags: ['greedy', 'math'] },
    { difficulty: 800, title: "Cover in Water", url: "https://codeforces.com/problemset/problem/1900/A", tags: ['greedy', 'implementation'] },
    { difficulty: 800, title: "Game with Integers", url: "https://codeforces.com/problemset/problem/1899/A", tags: ['games', 'math'] },
    { difficulty: 800, title: "Jagged Swaps", url: "https://codeforces.com/problemset/problem/1896/A", tags: ['constructive', 'sort'] },
    { difficulty: 800, title: "Doremy's Paint 3", url: "https://codeforces.com/problemset/problem/1890/A", tags: ['constructive', 'math'] },
    { difficulty: 800, title: "Don't Try to Count", url: "https://codeforces.com/problemset/problem/1881/A", tags: ['strings', 'brute force'] },
    { difficulty: 800, title: "How Much Does Daytona Cost?", url: "https://codeforces.com/problemset/problem/1878/A", tags: ['greedy'] },
    { difficulty: 800, title: "Goals of Victory", url: "https://codeforces.com/problemset/problem/1877/A", tags: ['math'] },
    { difficulty: 800, title: "Target Practice", url: "https://codeforces.com/problemset/problem/1873/C", tags: ['implementation'] },
    { difficulty: 800, title: "Ambitious Kid", url: "https://codeforces.com/problemset/problem/1866/A", tags: ['math', 'greedy'] },
    { difficulty: 800, title: "Sequence Game", url: "https://codeforces.com/problemset/problem/1862/B", tags: ['constructive'] },
    { difficulty: 800, title: "United We Stand", url: "https://codeforces.com/problemset/problem/1859/A", tags: ['number theory'] },
    { difficulty: 800, title: "Buttons", url: "https://codeforces.com/problemset/problem/1858/A", tags: ['math', 'games'] },
    { difficulty: 800, title: "Array Coloring", url: "https://codeforces.com/problemset/problem/1857/A", tags: ['math'] },
    { difficulty: 800, title: "Desorting", url: "https://codeforces.com/problemset/problem/1853/A", tags: ['sort'] },
    { difficulty: 800, title: "Forbidden Integer", url: "https://codeforces.com/problemset/problem/1845/A", tags: ['constructive'] },
    { difficulty: 800, title: "Grasshopper on a Line", url: "https://codeforces.com/problemset/problem/1837/A", tags: ['math'] },
    { difficulty: 800, title: "Unit Array", url: "https://codeforces.com/problemset/problem/1834/A", tags: ['greedy'] },
    { difficulty: 800, title: "Twin Permutations", url: "https://codeforces.com/problemset/problem/1831/A", tags: ['constructive'] },
    { difficulty: 800, title: "Blank Space", url: "https://codeforces.com/problemset/problem/1829/B", tags: ['implementation'] },
    { difficulty: 800, title: "Coins", url: "https://codeforces.com/problemset/problem/1814/A", tags: ['math'] },
    { difficulty: 800, title: "Walking Master", url: "https://codeforces.com/problemset/problem/1806/A", tags: ['math'] },
    { difficulty: 800, title: "We Need the Zero", url: "https://codeforces.com/problemset/problem/1805/A", tags: ['bitmask'] },
    { difficulty: 800, title: "Prepend and Append", url: "https://codeforces.com/problemset/problem/1791/C", tags: ['two pointers'] },
    { difficulty: 800, title: "Serval and Mocha's Array", url: "https://codeforces.com/problemset/problem/1789/A", tags: ['number theory'] },
    { difficulty: 800, title: "One and Two", url: "https://codeforces.com/problemset/problem/1788/A", tags: ['implementation'] },
    { difficulty: 800, title: "Make It Beautiful", url: "https://codeforces.com/problemset/problem/1783/A", tags: ['constructive'] },
    { difficulty: 800, title: "Everybody Likes Good Arrays!", url: "https://codeforces.com/problemset/problem/1777/A", tags: ['greedy'] },
    { difficulty: 800, title: "Extremely Round", url: "https://codeforces.com/problemset/problem/1766/A", tags: ['brute force'] },
    { difficulty: 800, title: "Two Permutations", url: "https://codeforces.com/problemset/problem/1761/A", tags: ['constructive'] }
].map(p => ({
    platform: 'codeforces',
    problemId: p.url.split('/').slice(-2).join('/'),
    title: p.title,
    url: p.url,
    difficulty: p.difficulty,
    tags: [...(p.tags || []), 'cp-31', `rating-${p.difficulty}`],
    acceptanceRate: 0
}));

const seedCP31 = async () => {
    try {
        await Problem.deleteMany({});
        console.log('🧹 Cleared existing problems...');
        await Problem.insertMany(cp31Problems);
        console.log(`🌱 Successfully seeded ${cp31Problems.length} CP-31 Problems (Rating 800)!`);
        console.log('💡 Run additional seed files for other ratings (900-1900)');
        mongoose.connection.close();
        console.log('👋 Connection closed');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedCP31();
