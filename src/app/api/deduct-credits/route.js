import { getSession } from 'next-auth/react';
import User from '../../../../models/User';

export async function POST(req) {
    const session = await getSession({ req });

    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    try {
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            console.error('User not found:', session.user.email);
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const { postCount = 1 } = await req.json();
        console.log('Post count:', postCount);

        if (user.credits < postCount) {
            console.error('Not enough credits:', user.credits);
            return new Response(JSON.stringify({ message: 'Not enough credits' }), { status: 400 });
        }

        user.credits -= postCount;
        await user.save();

        return new Response(JSON.stringify({ credits: user.credits }), { status: 200 });
    } catch (error) {
        console.error('Error deducting credits:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
