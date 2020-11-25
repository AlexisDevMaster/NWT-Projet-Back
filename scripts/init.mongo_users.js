/**
 * This script is to insert initial data inside the collection category of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert users array
db.getCollection('users').insertMany([
  {
    "username" : "Alexis",
    "password" : "$2b$10$s6wlGcorhwfI3hWFvIg/veiWSjGfcHfUwRzzktAuIurTpIOJ7SaTW",
    "salt" : "$2b$10$s6wlGcorhwfI3hWFvIg/ve",
    "verified" : false,
    "subscriptions" : [
    ],
    "likes" : [
    ]
  },
  {
    "username" : "Admin",
    "password" : "$2b$10$UpPqLKJiwjRvjKsiRmh5MehtCi4dB3oh81rATUQGKxiXpA2B2ef2e",
    "salt" : "$2b$10$UpPqLKJiwjRvjKsiRmh5Me",
    "verified" : true,
    "subscriptions" : [
    ],
    "likes" : [
    ]
  },
  {
    "username" : "Pierre",
    "password" : "$2b$10$vM3keaDBp1h5E2u1bZyf8eqhjW..rOqPH7HzOlbVBSB/RH2FZ.6lC",
    "salt" : "$2b$10$vM3keaDBp1h5E2u1bZyf8e",
    "verified" : false,
    "subscriptions" : [
    ],
    "likes" : [
    ]
  },
  {
    "username" : "John",
    "password" : "$2b$10$PEMptHcIenjFC/w.w.oyk.zAqU0fDtVoq49Z2rhhVNnOTe4HQjNgS",
    "salt" : "$2b$10$PEMptHcIenjFC/w.w.oyk.",
    "verified" : false,
    "subscriptions" : [
    ],
    "likes" : [
    ]
  }

]);

// display the final initial data
db.getCollection('users').find({});
