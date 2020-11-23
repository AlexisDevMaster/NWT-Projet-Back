/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('videos').insertMany([
    {
        "title": "Video1",
        "time": ISODate("2020-01-01T00:26:08.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video0-62/video0-62.mp4",
        "thumbnail_path": "video0-62/video0-62.png",
        "nb_view": 0,
        "url": "video0-62",
        "categories":[{"id": "", "title": ""}]
    },
    {
        "title": "Video2",
        "time":  ISODate("2020-01-01T23:00:00.000Z"),
        "upload_date": ISODate("2020-01-01T00:06:25.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video2/video2.mp4",
        "thumbnail_path": "video2/video2.png",
        "nb_view": 0,
        "url": "video2",
        "categories":[{"id": "", "title": "Music"}]
    },
    {
        "title": "Video3",
        "time": ISODate("2020-01-01T00:09:00.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video3/video3.mp4",
        "thumbnail_path":  "video3/video3.png",
        "nb_view": 0,
        "url": "video3",
        "categories":[{"id": "", "title": "Vlog"}]
    },
    {
        "title": "Video4",
        "time": ISODate("2020-01-01T00:05:00.000Z"),
        "upload_date": ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video4/video4.mp4",
        "thumbnail_path": "video4/video4.png",
        "nb_view": 0,
        "url": "video4",
        "categories":[{"id": "", "title": "Gaming"}]
    },    {
        "title": "Video5",
        "time": ISODate("2020-01-01T00:01:30.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video5/video5.mp4",
        "thumbnail_path": "video5/video5.png",
        "nb_view": 0,
        "url": "video5",
        "categories":[{"id": "", "title": "Gaming"}]
    },    {
        "title": "Video6",
        "time": ISODate("2020-01-01T00:01:30.000Z"),
        "upload_date":  ISODate("2020-01-01T00:01:30.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video6/video6.mp4",
        "thumbnail_path": "video6/video6.png",
        "nb_view": 0,
        "url": "video6",
        "categories":[{"id": "", "title": ""}]
    },    {
        "title": "Video7",
        "time": ISODate("2020-01-01T03:30:00.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video7/video7.mp4",
        "thumbnail_path": "video7/video7.png",
        "nb_view": 0,
        "url": "video7",
        "categories":[{"id": "", "title": ""}]
    },    {
        "title": "Video8",
        "time": ISODate("2020-01-01T00:15:00.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "video8/video8.mp4",
        "thumbnail_path": "video8/video8.png",
        "nb_view": 0,
        "url": "video8",
        "categories":[{"id": "", "title": "Gaming"}]
    },





]);

// Create an array with manager element
var data = db.getCollection('videos').find({}).map(function (element) {
    return { _id: element._id, title: element.title, categories: element.categories };
});

// For each element of the array ...
data.forEach(function (element) {
    // ... check if we have a manager
    // try to get the related manager element inside the array
    var categoriesIdArray = [];
    var categoriesNameArray = [];

    if(element.categories.length>0) {
        element.categories.forEach(function(el) {
              categoriesIdArray.push(db.getCollection('categories').find({ "title": el.title }).map(function(elt) {
                  return elt._id;
              }));
              categoriesNameArray.push(el.title);
          }
        );
        categoriesIdArray.forEach(function(elem, index){
        db.getCollection('videos').update(
              { _id: element._id,"categories": {$elemMatch: {title: categoriesNameArray[index]}}},
              {$set : {'categories.$.id' : elem[0]}})
            ;
        });
    }



});

// display the final initial data
db.getCollection('videos').find({});
