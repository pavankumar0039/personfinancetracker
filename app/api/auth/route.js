import userControllers from '../../../controllers/userController'

async function checkUser(request) {
    try {
        const userData = await request.json();
        const response = await userControllers.checkUser(userData);
        return new Response(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

}


export async function POST(request) {
    return checkUser(request);
}