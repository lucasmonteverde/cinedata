# CINEDATA


## Actions

* get all theater by city
* get all sessions by city & theater
* get all seats by session

 
## Collections

### session
```
id: Number
sector: Number
theater: Number
movie: Number
city: Number
type: ENUM(2D,3D,4D)
language: ENUM(DUB,LEG)
date: Date
updated: Date
seats: Number,
updates: [{
	date: Date
	available: Number
}]
```