<p align="center">
  <img src="./feta.png" alt="Feta">
</p>

# Feta - Keep your Instagram account

Feta is a tool that creates a backup of your Instagram account, including your profile, posts, reels and stories. It uses the data that you can request from Instagram and creates a website that you can publish on your own terms.

The idea is to be able to keep what you have shared on Instagram, once you decide to delete your account.

## How to use

To make use of Feta, you need to request a download of your data from Instagram, running Feta, and publish the output to a place of your choice.

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

1. Download the latest release of Feta from the [releases page](TODO)
2. Unpack the release ZIP file that you downloaded
3. Place the ZIP file that you downloaded from Instagram in the same folder as the unpacked Feta release
4. Open a terminal and navigate to the folder where you unpacked Feta
5. Run the following command:

```bash
node feta.js
```

Feta will now create a website in the `output` folder. This website presents your Instagram data like a profile page.