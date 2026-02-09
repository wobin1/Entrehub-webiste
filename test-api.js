// Native fetch is available in Node.js 18+

async function testRoute(url) {
    console.log(`Testing ${url}...`);
    try {
        const res = await fetch(`http://localhost:3000${url}`);
        const text = await res.text();
        console.log(`Status: ${res.status}`);
        console.log(`Content-Type: ${res.headers.get('content-type')}`);
        if (text.startsWith('<!DOCTYPE html>')) {
            console.log('Result: REDIRECTED TO HTML OR ERROR PAGE');
            console.log(text.substring(0, 500));
        } else {
            console.log('Result: JSON (likely)');
            try {
                JSON.parse(text);
                console.log('Valid JSON');
            } catch (e) {
                console.log('Invalid JSON but not HTML');
            }
        }
    } catch (e) {
        console.log(`Fetch error: ${e.message}`);
    }
    console.log('---');
}

async function run() {
    const routes = [
        '/api/blog',
        '/api/blog/categories',
        '/api/blog/tags',
        '/api/blog/authors',
        '/api/contact',
        '/api/auth/verify',
    ];

    for (const route of routes) {
        await testRoute(route);
    }
}

run();
