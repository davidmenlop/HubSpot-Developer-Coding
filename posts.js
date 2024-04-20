const fs = require('fs').promises;

async function getPosts() {
    try {
        const data = await fs.readFile('blogs.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error fetching posts: ${error.message}`);
    }
}

/*async function getPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching posts: ${error.message}`);
    }
}*/

module.exports = getPosts;
