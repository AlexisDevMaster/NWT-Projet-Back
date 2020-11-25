/**
 * This script is to insert initial data inside the collection category of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert category array
db.getCollection('category').insertMany([
    {
        "title" : "Gaming",
        "thumbnail" : "",
        "url" : "gaming"
    },
    {
        "title" : "Vlog",
        "thumbnail" : "",
        "url" : "vlog"
    },
    {
        "title" : "Music",
        "thumbnail" : "",
        "url" : "music"
    },
    {
        "title" : "Animals",
        "thumbnail" : "",
        "url" : "animals"
    },
    {
        "title" : "Sport",
        "thumbnail" : "",
        "url" : "sport"
    },
    {
        "title" : "Entertainment",
        "thumbnail" : "",
        "url" : "entertainment"
    },
    {
        "title" : "Science & Technology",
        "thumbnail" : "",
        "url" : "science-technology"
    }
]);

// display the final initial data
db.getCollection('category').find({});
