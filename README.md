# MERN Web Application

## MVP

- Signup/login

- Concerts with CRUD operations

- Venues with CRUD operations


## Bonus

- Responsiveness

- Authentication and ownership

- Search for concerts/venues

- Search for artists/albums/songs

<br>

## MODELS:

### USER 
email, name, password, image (bonus: [tickets]?)

### CONCERT
title, artist, description, image, date, ref venue, price --> (bonus: [tickets])

### VENUE
name, location, description, capacity, image

## Bonus:

### TICKETS
title, artist or id (from CONCERT), description, type, price

### ARTIST
name, image, [albums], linkToSpotify, [genres], ref to concerts

### ALBUM
name, [songs], image, [genres], year

### SONG
title, ref to artist?, ref to album?, lyrics

<hr>

## REST API ENDPOINTS

## Routes

### Concert routes

| HTTP verb | URL                             | Request body | Action                        |
| --------- | ------------------------------- | ------------ | ----------------------------- |
| GET       | `/api/concerts`                 | (empty)      | Returns all the concerts      |
| POST      | `/api/concerts`                 | JSON         | Adds a new concert            |
| GET       | `/api/concerts/:concertId`      | (empty)      | Returns the specified concert |
| PUT       | `/api/concerts/edit/:concertId` | JSON         | Edits the specified concert   |
| DELETE    | `/api/concerts/:concertId`      | (empty)      | Deletes the specified concert |

(implement auth and ownership)

### Venue routes

| HTTP verb | URL                         | Request body | Action                      |
| --------- | --------------------------- | ------------ | --------------------------- |
| GET       | `/api/venues`               | (empty)      | Returns all the venues      |
| POST      | `/api/venues`               | JSON         | Adds a new venue            |
| GET       | `/api/venues/:venueId`      | (empty)      | Returns the specified venue |
| PUT       | `/api/venues/edit/:venueId` | JSON         | Edits the specified venue   |
| DELETE    | `/api/venues/:venueId`      | (empty)      | Deletes the specified venue |

(implement auth and ownership)

### User routes

| HTTP verb | URL                          | Request body | Action                      |
| --------- | ---------------------------- | ------------ | --------------------------- |
| GET       | `/api/users`                 | (empty)      | Returns all the user        |
| GET       | `/api/users/:userId`         | (empty)      | Returns the specified user  |
| PUT       | `/api/users/edit/:userId`    | JSON         | Edits the specified user    |
| DELETE    | `/api/users/:userId`         | (empty)      | Deletes the specified user  |

(implement auth and ownership)

### Auth routes

| HTTP verb | URL            | Request Headers                 | Request Body              |
| --------- | -------------- | ------------------------------- | ------------------------- |
| POST      | `/auth/signup` | --                              | { email, password, name } |
| POST      | `/auth/login`  | --                              | { email, password }       |
| GET       | `/auth/verify` | Authorization: Bearer \< JWT \> | --                        |


