/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('videos').insertMany([
      {
          'title': 'Video1',
          'time': '2020-01-02T00:26:08Z',
          'upload_date': '2020-11-22T17:00:00Z',
          'nb_like': 1200,
          'nb_dislike': 1000,
          'author': 'John',
          'description': '',
          'path': 'Video1/video0-62.mp4',
          'type': 'video/mp4',
          'thumbnail_path': 'Video1/Video1.png',
          'nb_view': 57,
          'url': 'video0-62',
          'categories': []
      },
      {
          'title': 'Curb your Bitconnect',
          'time': '2020-01-01T00:02:01Z',
          'upload_date':'2020-01-01T00:06:25Z',
          'nb_like': 65000,
          'nb_dislike': 12000,
          'author': 'Admin',
          'description': 'No Description',
          'path': 'Video2/curb-your-bitconnect.mp4',
          'thumbnail_path': 'Video2/Video2.png',
          'nb_view': 8,
          'url': 'video2',
          'categories': []
      }, {
          'title': 'Space Cats — Magic Fly',
          'time': '2020-01-01T00:01:08Z',
          'upload_date': '1974-01-01T23:00:00Z',
          'nb_like': 586000,
          'nb_dislike': 27000,
          'author': 'Admin',
          'description': 'No Description',
          'path': 'Video3/space-cats-magic-fly.mp4',
          'thumbnail_path': 'Video3/Video3.png',
          'nb_view': 1,
          'url': 'video3',
          'categories': []

      }, {
          'title': 'Numb (Official Video) - Linkin Park',
          'time': '2020-01-01T00:03:06Z',
          'upload_date': '2020-11-22T21:15:00Z',
          'nb_like': 920000000,
          'nb_dislike': 213000,
          'author': 'Admin',
          'description': 'No Description',
          'path': 'Video4/numb-official-video-linkin-park.mp4',
          'thumbnail_path': 'Video4/Video4.png',
          'nb_view': 1494180920,
          'url': 'linkinpark-numb',
          'categories': []
      }, {
          'title': 'Un Gitan vénére',
          'time':'2020-01-01T00:01:04Z',
          'upload_date': '1974-01-01T23:00:00Z',
          'nb_like': 34000,
          'nb_dislike': 2900,
          'author': 'Admin',
          'description': 'Un gitan vraiment très vénére',
          'path': 'Video5/un-gitan-venere.mp4',
          'thumbnail_path': 'Video5/Video5.png',
          'nb_view': 4968989,
          'url': 'video5',
          'categories': []
      }
  ]

);

// display the final initial data
db.getCollection('videos').find({});
