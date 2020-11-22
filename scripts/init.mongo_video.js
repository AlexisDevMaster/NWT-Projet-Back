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
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
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
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
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
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
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
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
        "categories":[{"id": "", "title": "Gaming"}]
    },    {
        "title": "Video5",
        "time": ISODate("2020-01-01T00:01:30.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
        "categories":[{"id": "", "title": "Gaming"}]
    },    {
        "title": "Video6",
        "time": ISODate("2020-01-01T00:01:30.000Z"),
        "upload_date":  ISODate("2020-01-01T00:01:30.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
        "categories":[{"id": "", "title": ""}]
    },    {
        "title": "Video7",
        "time": ISODate("2020-01-01T03:30:00.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
        "categories":[{"id": "", "title": ""}]
    },    {
        "title": "Video8",
        "time": ISODate("2020-01-01T00:15:00.000Z"),
        "upload_date":  ISODate("1974-01-01T23:00:00.000Z"),
        "nb_like": 0,
        "nb_dislike": 0,
        "author": "Admin",
        "description": "",
        "path":  "",
        "thumbnail_path": "",
        "nb_view": 0,
        "url": "",
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
