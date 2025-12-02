const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function runTest() {
    try {
        console.log('🚀 Starting Integration Test...');

        // 1. Register/Login User
        const email = `test_${Date.now()}@example.com`;
        const password = 'password123';
        const username = `testuser_${Date.now()}`;

        console.log(`\n1. Registering user: ${email}`);
        let token;
        try {
            const res = await axios.post(`${API_URL}/auth/register`, {
                username,
                email,
                password
            });
            token = res.data.token;
            console.log('✅ Registered successfully');
        } catch (err) {
            console.log('Registration failed, trying login...');
            // If exists, login (though random email prevents this usually)
        }

        if (!token) throw new Error('Failed to get token');

        // 2. Update Profile with Handles
        console.log('\n2. Updating Profile with handles...');
        // Using 'tourist' for CF (guaranteed data) and a known LC user
        const handles = {
            codeforces: 'tourist',
            leetcode: 'neal_wu' // Known competitive programmer
        };

        await axios.put(
            `${API_URL}/profile`,
            handles,
            { headers: { 'x-auth-token': token, 'Authorization': `Bearer ${token}` } } // sending both for compatibility
        );
        console.log(`✅ Profile updated: CF=${handles.codeforces}, LC=${handles.leetcode}`);

        // 3. Trigger Sync
        console.log('\n3. Triggering Sync Engine...');
        const syncRes = await axios.post(
            `${API_URL}/sync`,
            {},
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        console.log('✅ Sync Response:', JSON.stringify(syncRes.data, null, 2));

        // 4. Fetch Stats & Upsolves
        console.log('\n4. Fetching Profile Stats & Upsolves...');
        const statsRes = await axios.get(
            `${API_URL}/profile/stats`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        console.log('📊 Profile Stats:', {
            cf_rating: statsRes.data.codeforces?.rating,
            lc_solved: statsRes.data.leetcode?.totalSolved
        });

        const upsolveRes = await axios.get(
            `${API_URL}/upsolve`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        console.log(`📝 Upsolve List Size: ${upsolveRes.data.length}`);
        if (upsolveRes.data.length > 0) {
            console.log('Sample Upsolve:', upsolveRes.data[0].title);
        }

        console.log('\n✅ TEST COMPLETED SUCCESSFULLY');

    } catch (err) {
        console.error('\n❌ TEST FAILED:', err.response?.data || err.message);
    }
}

runTest();
