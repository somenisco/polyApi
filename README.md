# polyApi

## Demo Video

- https://youtu.be/H1-hGTzcZIM

## Table of Contents

- [General Info](#general-information)
- [Tech Stack/ Framework Used](#tech-stack/-framework-used)
- [Getting Started](#Getting-Started)
- [Features](#features)
- [Images](#images)

## General Information

- This web application is for a user to paste a content and get a short url to share.

## Tech Stack/ Framework Used

- NodeJS
- MongoDB
- Express
- REACT
- Material UI

## Getting Started

The instructions for setting up project locally.
To get a local copy up and follow these simple example steps.

### Prerequisites

This is the list of things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/somenisco/polyApi.git
   ```
2. Install NPM packages for backend part

   ```sh
   cd server
   ```

   ```sh
   npm install
   ```

   ```sh
   npm start
   ```

3. follow readme in the client folder for client side setup

4. On file .env in server folder add the followings
   ```sh
   ATLAS_URI=
   ```
   for mongodb setup

## Features

- User can paste text snippets or documents.
- User gets a short url after pasting their content.
- The saved content have a default expiration time of 1 day. They will be automatically removed from the database.
- User can view recently created snippets.
- User can manually delete or renew the expiration time of a content url.
- User gets track of ips accessing the content url.
- User can also encrypt their content with a key.
- User can paste a url and get a short url which will redirect to the original url.

## Images

- Home Page

![home](https://user-images.githubusercontent.com/79037839/154550834-0d55090d-1475-4412-86a6-d6bb7a6829c9.png)

- Recent snippets Page

![recentsnips](https://user-images.githubusercontent.com/79037839/154551254-c71ab2af-7e61-4049-a866-8627eb568aab.png)

- Snippet Page

![pastelink](https://user-images.githubusercontent.com/79037839/154551135-91ecbdc3-b85b-449f-8459-a8a3937d4d2b.png)
