function calculateAveragePostsPerUser(users, posts) {
    const totalPosts = posts.length;
    const totalUsers = users.length;
    return totalPosts / totalUsers;
}

function identifyTopUsers(posts) {
    const userPostsCount = {};
    posts.forEach(post => {
        const userId = post.userId;
        userPostsCount[userId] = (userPostsCount[userId] || 0) + 1;
    });
    const sortedUserPosts = Object.entries(userPostsCount)
                                    .sort((a, b) => b[1] - a[1]);
    return sortedUserPosts.slice(0, 3).map(([userId, postCount]) => ({ userId, postCount }));
}

function findChanges(previousPosts, currentPosts) {
    const previousIds = new Set(previousPosts.map(post => post.id));
    const currentIds = new Set(currentPosts.map(post => post.id));

    const newPosts = currentPosts.filter(post => !previousIds.has(post.id));
    const deletedPosts = previousPosts.filter(post => !currentIds.has(post.id));

    const modifiedPosts = [];

    currentPosts.forEach(currentPost => {
        const previousPost = previousPosts.find(prevPost => prevPost.id === currentPost.id);
        if (previousPost && JSON.stringify(previousPost) !== JSON.stringify(currentPost)) {
            modifiedPosts.push(currentPost);
        }
    });

    return { newPosts, deletedPosts, modifiedPosts };
}

module.exports = { calculateAveragePostsPerUser, identifyTopUsers, findChanges };
