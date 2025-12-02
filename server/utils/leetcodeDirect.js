const axios = require('axios');

const fetchLeetCodeStats = async (username) => {
  if (!username) return null;

  try {
    const response = await axios.post('https://leetcode.com/graphql', {
      query: `
        query getUserProfile($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            profile {
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const data = response.data.data;
    if (!data || !data.matchedUser) return null;

    // Normalize the data for your frontend
    return {
      totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count, // All
      easy: data.matchedUser.submitStats.acSubmissionNum[1].count,        // Easy
      medium: data.matchedUser.submitStats.acSubmissionNum[2].count,      // Medium
      hard: data.matchedUser.submitStats.acSubmissionNum[3].count,        // Hard
      ranking: data.matchedUser.profile.ranking,
      contestRating: null,  // LeetCode doesn't expose contest rating via public API
      contestRanking: null
    };

  } catch (error) {
    console.error('LeetCode Direct Fetch Error:', error.message);
    return null;
  }
};

module.exports = fetchLeetCodeStats;
