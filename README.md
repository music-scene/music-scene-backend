# MusicScene REST API


## Description

REST API for the MusicScene app

- This repo implements the backend **REST API** built in **ExpressJS, MongoDB and Mongoose**. 

- A repository with the frontend (React App) can be found here [here](https://github.com/music-scene/music-scene-frontend)

## Instructions

To be able to run this on your computer, first clone the repo:

```
git clone <repo url>
```

Create a .env file in your project folder and add the following environment variables:
```
PORT=5005
ORIGIN=<location of your frontend app> (e.g: 'http://localhost:5173')
TOKEN_SECRET=<copy paste the string in here> (e.g: 'thisisasecrettoken')
```

Then run the following command to install all the required dependencies:

```
npm install
```
To run and test the application, the command is:

```
npm run dev
```

## REST API ENDPOINTS


### Concert routes

| HTTP verb | URL                        | Request body | Action                        |
| --------- | -------------------------- | ------------ | ----------------------------- |
| GET       | `/api/concerts`            | (empty)      | Returns all the concerts      |
| POST      | `/api/concerts`            | JSON         | Adds a new concert            |
| GET       | `/api/concerts/:concertId` | (empty)      | Returns the specified concert |
| PUT       | `/api/concerts/:concertId` | JSON         | Edits the specified concert   |
| DELETE    | `/api/concerts/:concertId` | (empty)      | Deletes the specified concert |


### Venue routes

| HTTP verb | URL                    | Request body | Action                      |
| --------- | ---------------------- | ------------ | --------------------------- |
| GET       | `/api/venues`          | (empty)      | Returns all the venues      |
| POST      | `/api/venues`          | JSON         | Adds a new venue            |
| GET       | `/api/venues/:venueId` | (empty)      | Returns the specified venue |
| PUT       | `/api/venues/:venueId` | JSON         | Edits the specified venue   |
| DELETE    | `/api/venues/:venueId` | (empty)      | Deletes the specified venue |


### Artist routes

| HTTP verb | URL                      | Request body | Action                       |
| --------- | ------------------------ | ------------ | ---------------------------- |
| GET       | `/api/artists`           | (empty)      | Returns all the artists      |
| POST      | `/api/artists`           | JSON         | Adds a new artist            |
| GET       | `/api/artists/:artistId` | (empty)      | Returns the specified artist |
| PUT       | `/api/artists/:artistId` | JSON         | Edits the specified artist   |
| DELETE    | `/api/artists/:artistId` | (empty)      | Deletes the specified artist |


### Genre routes

| HTTP verb | URL                    | Request body | Action                      |
| --------- | ---------------------- | ------------ | --------------------------- |
| GET       | `/api/genres`          | (empty)      | Returns all the genres      |
| GET       | `/api/genres/:genreId` | (empty)      | Returns the specified genre |
| DEL       | `/api/users/:genreId`  | JSON         | Deletes the specified genre |


### User routes

| HTTP verb | URL                     | Request body | Action                      |
| --------- | ----------------------- | ------------ | --------------------------- |
| GET       | `/api/users`            | (empty)      | Returns all the users       |
| GET       | `/api/users/:userId`    | (empty)      | Returns the specified user  |
| PUT       | `/api/users/:userId`    | JSON         | Edits the specified user    |
| DELETE    | `/api/users/:userId`    | (empty)      | Deletes the specified user  |


### Auth routes

| HTTP verb | URL            | Request Headers                 | Request Body              |
| --------- | -------------- | ------------------------------- | ------------------------- |
| POST      | `/auth/signup` | --                              | { email, password, name } |
| POST      | `/auth/login`  | --                              | { email, password }       |
| GET       | `/auth/verify` | Authorization: Bearer \< JWT \> | --                        |


## Demo


A demo of the REST API can be found here: https://music-scene.adaptable.app/api/