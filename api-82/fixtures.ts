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
            username: user1._id,
            information: 'hello',
            image:"fixtures/artist_1.jpg"
        },
        {
            name: 'Jane',
            username: user2._id,
            information: 'hello Jane',
            image:"fixtures/artist.2.jpg"
        })
    const [albumJohn1, albumJohn2, albumJane1,  albumJane2] = await Album.create(
        {
            title: 'albumJohn1',
            artist: John._id,
            date: 2023,
            image: 'fixtures/artist_1_album1.jpg'
        },
        {
            title: 'albumJohn2',
            artist: John._id,
            date: 2019,
            image: 'fixtures/artist_1_album2.jpg'
        },
        {
            title: 'albumJane1',
            artist: Jane._id,
            date: 2005,
            image: 'fixtures/artist_2_album1.jpg'
        },
        {
            title: 'albumJane2',
            artist: Jane._id,
            date: 2009,
            image: 'fixtures/artist_2_album2.jpg'
        })
     await Track.create(
        {
            title: 'Over the Rainbow',
            album: albumJohn1._id,
            continuance: ' 1:23',
            number: 1
        },
        {
            title: 'As Time Goes By',
            album: albumJohn1._id,
            continuance: ' 2:22',
            number: 2
        },
        {
            title: 'Singin’in the Rain',
            album: albumJohn1._id,
            continuance: ' 3:11',
            number: 3
        },
        {
            title: 'Moon River',
            album: albumJohn1._id,
            continuance: ' 5:74',
            number: 4
        },
        {
            title: 'White Christmas',
            album: albumJohn1._id,
            continuance: '1:25',
            number: 5
        },
        {
            title: 'Mrs. Robinson',
            album: albumJohn2._id,
            continuance: '6:86',
            number: 1
        },
        {
            title: 'When You Wish upon a Star',
            album: albumJohn2._id,
            continuance: ' 1:27',
            number: 2
        },
        {
            title: 'The Way We Were',
            album: albumJohn2._id,
            continuance: ' 2:28',
            number: 3
        },
        {
            title: 'Stayin’Alive',
            album: albumJohn2._id,
            continuance: ' 1:09',
            number: 4

        },
        {
            title: 'The Sound of Music',
            album: albumJohn2._id,
            continuance: ' 1:10',
            number: 5
        },
        {
            title: 'The Man That Got Away',
            album: albumJane1._id,
            continuance: ' 3:11',
            number: 1
        },
        {
            title: 'Diamonds Are a Girl’s Best Friend',
            album: albumJane1._id,
            continuance: ' 4:12',
            number: 2
        },
        {
            title: 'People',
            album: albumJane1._id,
            continuance: '5:13',
            number: 3
        },
        {
            title: 'My Heart Will Go On',
            album: albumJane1._id,
            continuance: ' 3:14',
            number: 4
        },
        {
            title: 'Cheek to Cheek',
            album: albumJane1._id,
            continuance: '2:15',
            number: 5
        },
        {
            title: 'Evergreen',
            album: albumJane2._id,
            continuance: '2:16',
            number: 1
        },
        {
            title: 'I Could Have Danced All Night',
            album: albumJane2._id,
            continuance: '1:17',
            number: 2
        },
        {
            title: 'Cabaret',
            album: albumJane2._id,
            continuance: '2:18',
            number: 3
        },
        {
            title: 'Some Day My Prince Will Come',
            album: albumJane2._id,
            continuance: '11:19',
            number: 4
        },
        {
            title: 'Somewhere',
            album: albumJane2._id,
            continuance: '15:20',
            number: 5
        },
        )
    await db.close()

}

run().catch(console.error)