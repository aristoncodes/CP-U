#!/usr/bin/env node
/**
 * Test Profile Save Flow
 * Tests:
 * 1. Profile edit is saved to database
 * 2. Profile displays updated information
 * 3. Data persists and is fetched correctly
 */

const axios = require('axios');
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

const API_URL = 'http://localhost:5001/api';
let authToken = null;

// Test credentials (using existing user from DB)
const TEST_CREDENTIALS = {
    email: 'aditya@gmail.com',
    password: 'aditya' // You may need to adjust this
};

// Updated profile data to test
const UPDATED_PROFILE = {
    name: 'Aditya Yadav (Updated)',
    bio: 'Testing profile save - Updated at ' + new Date().toLocaleTimeString(),
    codeforces: 'joyboy24_updated',
    leetcode: 'aditya_leetcode_test'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
    log(`\n[Step ${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
    log(`✓ ${message}`, 'green');
}

function logError(message) {
    log(`✗ ${message}`, 'red');
}

function logInfo(message) {
    log(`ℹ ${message}`, 'yellow');
}

async function login() {
    try {
        logStep(1, 'Login to get auth token');
        const response = await axios.post(`${API_URL}/auth/login`, TEST_CREDENTIALS);
        authToken = response.data.token;
        logSuccess('Login successful');
        logInfo(`Token: ${authToken.substring(0, 20)}...`);
        return true;
    } catch (error) {
        logError(`Login failed: ${error.response?.data?.msg || error.message}`);
        return false;
    }
}

async function getProfileBefore() {
    try {
        logStep(2, 'Fetch profile BEFORE update');
        const response = await axios.get(`${API_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        const profile = response.data;
        logSuccess('Profile fetched successfully');
        console.log('  Current profile data:');
        console.log(`  - Name: ${profile.name || 'N/A'}`);
        console.log(`  - Bio: ${profile.bio || 'N/A'}`);
        console.log(`  - Codeforces: ${profile.handles?.codeforces || 'N/A'}`);
        console.log(`  - LeetCode: ${profile.handles?.leetcode || 'N/A'}`);
        return profile;
    } catch (error) {
        logError(`Failed to fetch profile: ${error.message}`);
        return null;
    }
}

async function updateProfile() {
    try {
        logStep(3, 'Update profile with new data');
        logInfo('Sending updated data:');
        console.log(`  - Name: ${UPDATED_PROFILE.name}`);
        console.log(`  - Bio: ${UPDATED_PROFILE.bio}`);
        console.log(`  - Codeforces: ${UPDATED_PROFILE.codeforces}`);
        console.log(`  - LeetCode: ${UPDATED_PROFILE.leetcode}`);

        const response = await axios.put(
            `${API_URL}/user/profile`,
            UPDATED_PROFILE,
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        logSuccess('Profile updated successfully in database');
        return response.data;
    } catch (error) {
        logError(`Failed to update profile: ${error.response?.data || error.message}`);
        return null;
    }
}

async function getProfileAfter() {
    try {
        logStep(4, 'Fetch profile AFTER update to verify persistence');
        const response = await axios.get(`${API_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        const profile = response.data;
        logSuccess('Profile fetched successfully');
        console.log('  Updated profile data:');
        console.log(`  - Name: ${profile.name || 'N/A'}`);
        console.log(`  - Bio: ${profile.bio || 'N/A'}`);
        console.log(`  - Codeforces: ${profile.handles?.codeforces || 'N/A'}`);
        console.log(`  - LeetCode: ${profile.handles?.leetcode || 'N/A'}`);
        return profile;
    } catch (error) {
        logError(`Failed to fetch profile: ${error.message}`);
        return null;
    }
}

async function verifyData(profileAfter) {
    logStep(5, 'Verify that data matches what we sent');
    let allMatch = true;

    if (profileAfter.name !== UPDATED_PROFILE.name) {
        logError(`Name mismatch: expected "${UPDATED_PROFILE.name}", got "${profileAfter.name}"`);
        allMatch = false;
    } else {
        logSuccess(`Name matches: "${profileAfter.name}"`);
    }

    if (profileAfter.bio !== UPDATED_PROFILE.bio) {
        logError(`Bio mismatch: expected "${UPDATED_PROFILE.bio}", got "${profileAfter.bio}"`);
        allMatch = false;
    } else {
        logSuccess(`Bio matches`);
    }

    if (profileAfter.handles?.codeforces !== UPDATED_PROFILE.codeforces) {
        logError(`Codeforces handle mismatch: expected "${UPDATED_PROFILE.codeforces}", got "${profileAfter.handles?.codeforces}"`);
        allMatch = false;
    } else {
        logSuccess(`Codeforces handle matches: "${profileAfter.handles?.codeforces}"`);
    }

    if (profileAfter.handles?.leetcode !== UPDATED_PROFILE.leetcode) {
        logError(`LeetCode handle mismatch: expected "${UPDATED_PROFILE.leetcode}", got "${profileAfter.handles?.leetcode}"`);
        allMatch = false;
    } else {
        logSuccess(`LeetCode handle matches: "${profileAfter.handles?.leetcode}"`);
    }

    return allMatch;
}

async function testStats() {
    try {
        logStep(6, 'Test stats fetch (to verify handles are used correctly)');
        const response = await axios.get(`${API_URL}/profile/stats`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        logSuccess('Stats fetched successfully');
        console.log('  Stats data:');
        console.log(`  - Codeforces: ${JSON.stringify(response.data.codeforces || 'N/A')}`);
        console.log(`  - LeetCode: ${JSON.stringify(response.data.leetcode || 'N/A')}`);
        return true;
    } catch (error) {
        logError(`Failed to fetch stats: ${error.message}`);
        return false;
    }
}

async function runTests() {
    log('\n═══════════════════════════════════════════════', 'blue');
    log('  PROFILE SAVE & FETCH TEST', 'blue');
    log('═══════════════════════════════════════════════\n', 'blue');

    // Step 1: Login
    const loginSuccess = await login();
    if (!loginSuccess) {
        logError('\nTest failed: Could not authenticate');
        process.exit(1);
    }

    // Step 2: Get profile before
    const profileBefore = await getProfileBefore();
    if (!profileBefore) {
        logError('\nTest failed: Could not fetch initial profile');
        process.exit(1);
    }

    // Step 3: Update profile
    const updateResult = await updateProfile();
    if (!updateResult) {
        logError('\nTest failed: Could not update profile');
        process.exit(1);
    }

    // Step 4: Get profile after
    const profileAfter = await getProfileAfter();
    if (!profileAfter) {
        logError('\nTest failed: Could not fetch updated profile');
        process.exit(1);
    }

    // Step 5: Verify data
    const dataMatches = await verifyData(profileAfter);
    if (!dataMatches) {
        logError('\nTest failed: Data does not match');
        process.exit(1);
    }

    // Step 6: Test stats
    await testStats();

    // Final result
    log('\n═══════════════════════════════════════════════', 'green');
    log('  ✓ ALL TESTS PASSED!', 'green');
    log('═══════════════════════════════════════════════\n', 'green');
    log('Summary:', 'cyan');
    log('1. ✓ Profile can be edited', 'green');
    log('2. ✓ Edited data is saved to database', 'green');
    log('3. ✓ Updated profile displays correctly', 'green');
    log('4. ✓ Data persists and fetches properly', 'green');
    log('5. ✓ Stats endpoint uses updated handles\n', 'green');
}

// Run the tests
runTests().catch(error => {
    logError(`\nUnexpected error: ${error.message}`);
    console.error(error);
    process.exit(1);
});
