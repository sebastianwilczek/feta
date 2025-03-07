<p align="center">
  <img src="./feta.png" alt="Feta">
</p>

# Feta - Keep your Instagram account

Feta is a tool that creates a backup of your Instagram account, including your profile, posts, reels and stories. It uses the data that you can request from Instagram and creates a website that you can publish on your own terms.

The idea is to be able to keep what you have shared on Instagram, once you decide to delete your account.

## What it looks like

The website that Feta creates looks like a profile page. It includes your profile picture, bio, posts, reels and stories.

For an example, [take a look here](https://i-guess-sebastian.netlify.app).

## Disclaimer

This project is in no way affiliated with Instagram or Meta. It is a personal project to help people keep their Instagram data in a format that is easy to share and publish, without having to keep their account, if they wish to delete it.

## How to use

To make use of Feta, you need to request a download of your data from Instagram, run Feta, and publish the output to a place of your choice.

### Request your data from Instagram

To request your data from Instagram, follow these steps:

1. Go to your Instagram profile
2. Click on the three lines in the top right corner
3. Click on `Account Centre`
4. Click on `Your information and permissions`
5. Click on `Download your information`
6. Click on `Download or transfer information`
7. Select the checkbox next to your Instagram account, and click on `Next`
8. Click on `All available information`
9. Click on `Download to device`
10. Make sure you choose the following settings:
    - Date range: `All time`
    - Format: `JSON`
    - Media quality: `High`
11. Click on `Create files`

Instagram will now prepare your data and send you an email once it is ready to download. Once it is, make sure to download the ZIP file that is sent to you. This ZIP file contains all the data that Instagram has on you. Keep the ZIP file as is, there is no need to unpack it.

### Run Feta

To run Feta, you need to have Node.js installed on your computer. If you don't have it installed, you can download it from [nodejs.org](https://nodejs.org/).

Once you have Node.js and npm installed, you can run Feta by following these steps:

1. Download the latest release of Feta [here](https://github.com/sebastianwilczek/feta/archive/refs/tags/latest.zip)
2. Unpack the `feta-latest.zip` file that you downloaded
3. Place the ZIP file that you downloaded from Instagram in the same folder as Feta (likely called `feta-latest` or similar)
4. Open a terminal and navigate to the folder where you unpacked Feta
5. Run the following command:

```bash
node feta.js
```

Feta will now create a website in the `output` folder. This website presents your Instagram data like a profile page.

### Publish the website

Once you have the website inside the `output` folder, you can publish it to a place of your choice. There are plenty of options for this. The following guide is intended for people who are not familiar with web hosting, as a simple way to publish the website.

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `output` folder to the drop area
3. Netlify will now upload the website and give you a link where you can view it
4. WATCH OUT: This link is temporary and will be deleted after a while. Make sure to create an account.
5. Once you have an account, go to [https://app.netlify.com/](https://app.netlify.com/)
6. Click on the website that was created for you (the name will likely be random)
7. Click on `Site configuration`
8. Click on `Change site name`
9. Choose a new name, for example your Instagram username, if it is available
10. Click on `Save`
11. Your Feta profile is now published at `https://[Your chosen name].netlify.app`. You can share this link with others.