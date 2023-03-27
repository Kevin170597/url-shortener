import { MongoClient } from 'mongodb';
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);

const db = await client.connect();
!db ? console.log('error connecting db') : console.log('db connected');

export default client.db('url-shortener');