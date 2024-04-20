const getUsers = require('./users');
const getPosts = require('./posts');
const { calculateAveragePostsPerUser, identifyTopUsers, findChanges } = require('./utils');

async function syncData() {
    while (true) {
        try {
            const previousPosts = await getPosts();
            console.log("Posts data fetched. Waiting for 1 minute before checking for changes...");
            await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute

            const currentPosts = await getPosts();
            const hasChanged = JSON.stringify(previousPosts) !== JSON.stringify(currentPosts);
            if (hasChanged) {
                console.log("Posts data has changed. Updating...");

                const newPosts = currentPosts.filter(post => !previousPosts.some(prevPost => prevPost.id === post.id));
                const deletedPosts = previousPosts.filter(prevPost => !currentPosts.some(post => post.id === prevPost.id));
                
                // Show new posts
                if (newPosts.length > 0) {
                    console.log("New posts:");
                    newPosts.forEach(post => console.log(post));
                }

                // Show deleted posts
                if (deletedPosts.length > 0) {
                    console.log("Deleted posts:");
                    deletedPosts.forEach(post => console.log(post));
                }
                
                // Show modified posts
                console.log("Modified posts:");
                currentPosts.forEach(currentPost => {
                    const previousPost = previousPosts.find(prevPost => prevPost.id === currentPost.id);
                    if (previousPost && JSON.stringify(previousPost) !== JSON.stringify(currentPost)) {
                        console.log("Previous post:");
                        console.log(previousPost);
                        console.log("Current post:");
                        console.log(currentPost);
                    }
                });

                // Calculate average posts per user and identify top users
                const users = await getUsers();
                const averagePostsPerUser = calculateAveragePostsPerUser(users, currentPosts);
                console.log(`Average number of posts per user: ${averagePostsPerUser.toFixed(2)}`);

                const topUsers = identifyTopUsers(currentPosts);
                console.log("Top 3 users with the most posts:");
                topUsers.forEach(({ userId, postCount }) => {
                    console.log(`User ID: ${userId}, Posts: ${postCount}`);
                });
            } else {
                console.log("No changes detected. Waiting for 1 minute before checking again...");
            }
        } catch (error) {
            console.error(`Error occurred during synchronization: ${error}`);
        }
    }
}

async function main() {
    try {
        const users = await getUsers();
        const posts = await getPosts();

        const averagePostsPerUser = calculateAveragePostsPerUser(users, posts);
        console.log(`Average number of posts per user: ${averagePostsPerUser.toFixed(2)}`);

        const topUsers = identifyTopUsers(posts);
        console.log("Top 3 users with the most posts:");
        topUsers.forEach(({ userId, postCount }) => {
            console.log(`User ID: ${userId}, Posts: ${postCount}`);
        });

        syncData();

    } catch (error) {
        console.error(`Error occurred: ${error}`);
    }
}

main();
