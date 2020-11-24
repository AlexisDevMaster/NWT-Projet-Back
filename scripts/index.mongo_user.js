/**
 * This script is to create index inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('user').createIndex({ id:1, login: 1, password: 1 }, { unique: true });
