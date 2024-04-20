# Blog Synchronization Tool

This tool allows you to synchronize and monitor changes in a blog system, fetching data from both a local JSON file and an external API.


## Quick Start

### Step 1: Clone the project

Create a folder where you want this sample to be cloned and clone the repository

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

