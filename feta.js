const fs = require("fs");
const path = require("path");

// Find the ZIP file
const zipFile = fs.readdirSync(".").find(file => file.endsWith(".zip") && file.startsWith("instagram-"));
if (!zipFile) {
  console.error("No ZIP file found.");
  process.exit(1);
}

// Extract the ZIP file to a temp directory
const basePath = "./temp";
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}
const childProcess = require("child_process");

// Windows
if (process.platform === "win32") {
  childProcess.execSync(`tar -xf "${zipFile}" -C "${basePath}"`);
} else {
  childProcess.execSync(`unzip -o "${zipFile}" -d "${basePath}"`);
}

const decodeString = (input) => {
  const bytes = Uint8Array.from(input, char => char.charCodeAt(0));
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
};

// Get personal information
const personalInformationFile = JSON.parse(fs.readFileSync(`${basePath}/personal_information/personal_information/personal_information.json`, "utf-8"));
const username = personalInformationFile.profile_user[0].string_map_data.Username.value;
const name = decodeString(personalInformationFile.profile_user[0].string_map_data.Name.value);
const bio = decodeString(personalInformationFile.profile_user[0].string_map_data.Bio.value);
const website = personalInformationFile.profile_user[0].string_map_data.Website.value;
const websiteDisplay = website.replace("https://", "").replace("http://", "").replace("www.", "").replace("/", "");
const isPrivateAccount = personalInformationFile.profile_user[0].string_map_data["Private account"].value === "True";
const profilePicturePath = personalInformationFile.profile_user[0].media_map_data["Profile photo"].uri;

// Get follower/following stats
const followingFile = JSON.parse(fs.readFileSync(`${basePath}/connections/followers_and_following/following.json`, "utf-8"));
const numberOfFollowing = followingFile.relationships_following.length;
const followers = [];
const followersPath = `${basePath}/connections/followers_and_following`;
const followersFiles = fs.readdirSync(followersPath).filter(file => file.startsWith("followers_"));
followersFiles.forEach(file => {
  const followersData = JSON.parse(fs.readFileSync(`${followersPath}/${file}`, "utf-8"));
  followers.push(...followersData);
});
const numberOfFollowers = followers.length;

// Get posts
const getEntriesFromPost = (post) => {
  return post.media.map(media => ({
    media: media.uri,
    title: decodeString(post.title ?? media.title),
    timestamp: post.creation_timestamp ?? media.creation_timestamp,
    date: new Date(parseInt(post.creation_timestamp ?? media.creation_timestamp) * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    isVideo: media.uri.endsWith(".mp4"),
  }));
}
const posts = [];
const postsPath = `${basePath}/your_instagram_activity/content`;
const postsFiles = fs.readdirSync(postsPath).filter(file => file.startsWith("posts_"));
postsFiles.forEach(file => {
  const postsData = JSON.parse(fs.readFileSync(`${postsPath}/${file}`, "utf-8"));
  postsData.forEach(post => posts.push(...getEntriesFromPost(post)));
});

// Get reels
const reelsFile = JSON.parse(fs.readFileSync(`${basePath}/your_instagram_activity/content/reels.json`, "utf-8"));
reelsFile.ig_reels_media.map(reel => posts.push(...getEntriesFromPost(reel)));

const allPosts = posts.sort((a, b) => b.timestamp - a.timestamp);
const numberOfPosts = allPosts.length;

// Get stories
const storiesFile = JSON.parse(fs.readFileSync(`${basePath}/your_instagram_activity/content/stories.json`, "utf-8"));
const stories = storiesFile.ig_stories.filter(story => {
  let exists = false;
  try {
    fs
      .readFileSync(`${
        basePath
      }/${
        story.uri
      }`)
      .toString()
      .includes("Exif");
    exists = true;
  } catch (e) {
    console.log(`Story ${story.uri} does not exist in the media directory.`);
  }
  return exists;
}).map(story => ({
  media: story.uri,
  timestamp: story.creation_timestamp,
  date: new Date(parseInt(story.creation_timestamp) * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  isVideo: story.uri.endsWith(".mp4"),
})).sort((a, b) => a.timestamp - b.timestamp);

// Create the output directory
if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}
// Create the user directory
if (!fs.existsSync(`output/${username}`)) {
  fs.mkdirSync(`output/${username}`);
}

// Copy over the media directory, including subdirectories
const mediaPath = `${basePath}/media`;
childProcess.execSync(`cp -r ${mediaPath} output/${username}/media`);

// Write to file
fs.writeFileSync(`output/${username}/data.json`, JSON.stringify({
  username,
  name,
  bio,
  website,
  websiteDisplay,
  isPrivateAccount,
  profilePicturePath,
  numberOfFollowers,
  numberOfFollowing,
  numberOfPosts,
  posts: allPosts,
  hasStories: stories.length > 0,
  numberOfStories: stories.length,
  stories,
}, null, 2));

// Remove the temp directory
childProcess.execSync(`rm -rf ${basePath}`);

// Render the HTML
const handlebars = require("./handlebars.min.js");
const template = handlebars.compile(fs.readFileSync("template.hbs", "utf-8"));
const html = template(JSON.parse(fs.readFileSync(`output/${username}/data.json`, "utf-8")));
fs.writeFileSync(`output/index.html`, html);

// Copy over logo
childProcess.execSync(`cp feta.png output/feta.png`);

// Remove the data.json file
fs.unlinkSync(`output/${username}/data.json`);
