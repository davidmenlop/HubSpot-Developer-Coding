# Blog Synchronization Tool

This tool allows you to synchronize and monitor changes in a blog system, fetching data from both a local JSON file and an external API.


## Quick Start

### Step 1: Clone the project

Clone the repository on your local desktop

### Step 2: Install dependencies

Now in the CLI, enter into this newly created folder. Run `npm install` to install the dependencies for this project.

### Step 3: Run project

Run `npm start`. 

### Step 4: Update Blogs data.

In the blogs.json following steps:

1. In the blogs.json file update, delete or add a post and save the JSON document.
2. Check on your console the news logs with changes on the Average number of posts when delete or add data.
3. Check on your console the news logs with changes on the Top 3 users with the most posts when delete or add data.
4. Check on your console the news logs with changes on the New Posts or Deleted Post when delete or add data.
5. Check on your console the news logs with changes on the Modified posts with current and previous information.

## Results

When you start your application, it will show you the average number of posts per user and the top 3 users with the most posts. The code queries the information every minute to find changes and update the data once changes are made in the `blogs.json` file. After the minute has passed, you will see the new information in the console, where it displays the object of the new post or deleted post, followed by the previous and current versions of modified posts. Then, it shows the average number of posts per user again and updates the top 3 if applicable.

![display-an-iframe-modal-example](https://github.com/davidmenlop/HubSpot-Developer-Coding/blob/master/Logs.png)

## Point of discussion syncData() function

1. **Infinite Loop:** The function uses a `while (true)` loop to continuously execute and check for changes in the posts data.

2. **Get Previous Posts:** First, it retrieves the previous posts by calling the `getPosts()` function and stores them in the `previousPosts` variable.

3. **1-Minute Wait:** After obtaining the previous posts, it displays a message in the console indicating that the posts data has been fetched and waits for 1 minute before proceeding with change checking. This is done using `await new Promise(resolve => setTimeout(resolve, 60000))`, which is an asynchronous wait for 1 minute.

4. **Get Current Posts:** After waiting for 1 minute, it retrieves the current posts by calling the `getPosts()` function again and stores them in the `currentPosts` variable.

5. **Check for Changes:** It compares the previous posts with the current ones using `JSON.stringify(previousPosts) !== JSON.stringify(currentPosts)` to determine if there have been any changes in the posts.

6. **Show Changes:** If changes are detected, it displays the new posts, deleted posts, and modified posts in the console. It uses the `filter()` and `find()` functions to compare the previous and current posts and find the changes.

7. **Calculate Average and Identify Top Users:** After showing the changes, it calculates the average number of posts per user and identifies the top 3 users with the most posts using the `identifyTopUsers()` function. This is done by calling the `getUsers()` and `calculateAveragePostsPerUser()` functions.

8. **Error Handling:** The function handles any errors that may occur during the synchronization process and prints the errors to the console.

9. **1-Minute Wait:** After completing all operations, it returns to step 2 and waits for another 1 minute before starting a new check for changes.

This function basically automates the process of checking for changes in the posts data, updating the information in the console whenever changes are made to the posts.
