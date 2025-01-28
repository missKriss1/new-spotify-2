import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try{
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
        await db.dropCollection('albums');
        await db.dropCollection('trackHistories');
        await db.dropCollection('users');
    }catch(err){
        console.log(err);
    }

    const  [user1, user2] = await User.create(
        {
            username: 'user1',
            password: '123',
            token: randomUUID(),
            role: 'admin'
        },
        {
            username: 'user2',
            password: '12345',
            token: randomUUID(),
            role: 'user'
        }
    )

    const [John, Jane] = await Artist.create(
        {
            name: 'John',
            user: user1._id,
            information: 'hello',
            isPublished: true,
            image:"fixtures/artist_1.jpg"
        },
        {
            name: 'Jane',
            user: user2._id,
            information: 'hello Jane',
            isPublished: false,
            image:"fixtures/artist.2.jpg"
        })
    const [albumJohn1, albumJohn2, albumJane1,  albumJane2] = await Album.create(
        {
            title: 'albumJohn1',
            user: user1._id,
            artist: John._id,
            date: 2023,
            isPublished: true,
            image: 'fixtures/artist_1_album1.jpg'
        },
        {
            title: 'albumJohn2',
            user: user1._id,
            artist: John._id,
            date: 2019,
            isPublished: true,
            image: 'fixtures/artist_1_album2.jpg'
        },
        {
            title: 'albumJane1',
            user: user2._id,
            artist: Jane._id,
            date: 2005,
            isPublished: true,
            image: 'fixtures/artist_2_album1.jpg'
        },
        {
            title: 'albumJane2',
            user: user2._id,
            artist: Jane._id,
            date: 2009,
            isPublished: false,
            image: 'fixtures/artist_2_album2.jpg'
        })
     await Track.create(
        {
            title: 'Over the Rainbow',
            user: user1._id,
            album: albumJohn1._id,
            continuance: ' 1:23',
            isPublished: true,
            number: 1
        },
        {
            title: 'As Time Goes By',
            user: user1._id,
            album: albumJohn1._id,
            continuance: ' 2:22',
            isPublished: true,
            number: 2
        },
        {
            title: 'Singin’in the Rain',
            album: albumJohn1._id,
            user: user1._id,
            continuance: ' 3:11',
            isPublished: true,
            number: 3
        },
        {
            title: 'Moon River',
            album: albumJohn1._id,
            user: user1._id,
            continuance: ' 5:74',
            isPublished: true,
            number: 4
        },
        {
            title: 'White Christmas',
            album: albumJohn1._id,
            user: user1._id,
            continuance: '1:25',
            isPublished: false,
            number: 5
        },
        {
            title: 'Mrs. Robinson',
            album: albumJohn2._id,
            user: user1._id,
            continuance: '6:86',
            isPublished: true,
            number: 1
        },
        {
            title: 'When You Wish upon a Star',
            album: albumJohn2._id,
            user: user1._id,
            continuance: ' 1:27',
            isPublished: true,
            number: 2
        },
        {
            title: 'The Way We Were',
            album: albumJohn2._id,
            user: user1._id,
            continuance: ' 2:28',
            isPublished: true,
            number: 3
        },
        {
            title: 'Stayin’Alive',
            album: albumJohn2._id,
            user: user1._id,
            continuance: ' 1:09',
            isPublished: true,
            number: 4

        },
        {
            title: 'The Sound of Music',
            album: albumJohn2._id,
            user: user1._id,
            continuance: ' 1:10',
            isPublished: true,
            number: 5
        },
        {
            title: 'The Man That Got Away',
            album: albumJane1._id,
            user: user2._id,
            continuance: ' 3:11',
            isPublished: false,
            number: 1
        },
        {
            title: 'Diamonds Are a Girl’s Best Friend',
            album: albumJane1._id,
            user: user2._id,
            continuance: ' 4:12',
            isPublished: false,
            number: 2
        },
        {
            title: 'People',
            album: albumJane1._id,
            user: user2._id,
            continuance: '5:13',
            isPublished: true,
            number: 3
        },
        {
            title: 'My Heart Will Go On',
            album: albumJane1._id,
            user: user2._id,
            continuance: ' 3:14',
            isPublished: true,
            number: 4
        },
        {
            title: 'Cheek to Cheek',
            album: albumJane1._id,
            user: user2._id,
            continuance: '2:15',
            isPublished: true,
            number: 5
        },
        {
            title: 'Evergreen',
            album: albumJane2._id,
            user: user2._id,
            continuance: '2:16',
            isPublished: true,
            number: 1
        },
        {
            title: 'I Could Have Danced All Night',
            album: albumJane2._id,
            user: user2._id,
            continuance: '1:17',
            isPublished: true,
            number: 2
        },
        {
            title: 'Cabaret',
            album: albumJane2._id,
            user: user2._id,
            continuance: '2:18',
            isPublished: true,
            number: 3
        },
        {
            title: 'Some Day My Prince Will Come',
            album: albumJane2._id,
            user: user2._id,
            continuance: '11:19',
            isPublished: true,
            number: 4
        },
        {
            title: 'Somewhere',
            album: albumJane2._id,
            user: user2._id,
            continuance: '15:20',
            isPublished: true,
            number: 5
        },
        )
    await db.close()

}

run().catch(console.error)