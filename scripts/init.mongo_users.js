/**
 * This script is to insert initial data inside the collection category of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert users array
db.getCollection('users').insertMany([
  {
    username: 'john',
    password: 'changeme',
    verified: 'true',
    subscriptions : [],
    likes : [],

  },
  {
    username: 'chris',
    password: 'secret',
    verified: 'true',
    subscriptions : [],
    likes : [],

  },
  {
    username: 'maria',
    password: 'guess',
    verified: 'true',
    subscriptions : [],
    likes : [],

  },
]);

// display the final initial data
db.getCollection('users').find({});
