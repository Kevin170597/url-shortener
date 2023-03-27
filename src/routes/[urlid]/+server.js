import { json } from '@sveltejs/kit';
import db from '$lib/db/db';

export async function GET({ params }) {
    try {
        const url = await db.collection('urls').findOne({ urlId: params.urlid });
        if (url) {
            return Response.redirect(url.origUrl);
        } else {
            return json({ message: 'url not found' }, { status: 404 });
        }
    } catch (error) {
        console.log(18, error);
        return json({ message: 'server error' }, { status: 500 })
    }
};