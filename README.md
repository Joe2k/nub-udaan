# Fitness Slot Booking System

## Setup

```
yarn
```

## Run

```
node app.js
```

## API

Create Class

```
POST /api/class/new
{
    "name":"yoga",
    "capacity":200
}
```

Book Slot

```
POST /api/class/book/:classId
{
    "email":"joe@gmail.com",
}
```

Cancel Slot

```
POST /api/class/cancel/:classId
{
    "email":"joe@gmail.com",
}
```
