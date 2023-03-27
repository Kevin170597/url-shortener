import { json } from '@sveltejs/kit';
import db from "$lib/db/db";
import { BASE_URL } from '$env/static/private';
import { nanoid } from 'nanoid';
import { validateUrl } from '$lib/utils/utils';

export async function GET() {
    const urls = await db.collection('urls').find().toArray();
    return json(urls, { status: 200 });
};

export async function POST({ request }) {
    if (!request.body) return json({ error: 'url is required' }, { status: 400 });
    const { origUrl } = await request.json();
    if (!origUrl) {
        return json({ error: 'url is required' }, { status: 400 });
    };

    if (validateUrl(origUrl)) {
        try {
            let urlExist = await db.collection('urls').findOne({ origUrl });
            if (urlExist) {
                return json({ url: urlExist }, { status: 200 });
            } else {
                const urlId = nanoid(5);
                const shortUrl = `${BASE_URL}/${urlId}`;
                const url = { origUrl, shortUrl, urlId };
                await db.collection('urls').insertOne(url);
                return json({ url }, { status: 200 });
            }
        } catch (error) {
            console.log(error);
            return json({ error: 'server error' }, { status: 500 });
        }
    } else {
        return json({ error: 'invalid url' }, { status: 400 });
    }
};