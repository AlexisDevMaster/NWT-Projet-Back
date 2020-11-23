/**
 * This script is to insert initial data inside the collection category of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert category array
db.getCollection('user').insertMany([
  {
    userId: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    userId: 2,
    username: 'chris',
    password: 'secret',
  },
  {
    userId: 3,
    username: 'maria',
    password: 'guess',
  },
]);

// display the final initial data
db.getCollection('user').find({});
