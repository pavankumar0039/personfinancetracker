const {userControllers}=require('../../../controllers/userController')

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


export async function handler(request) {
    const { method } = request;

    switch (method) {
        case "POST":
            return checkUser(request);

        
        default:
            return new Response(
                JSON.stringify({ error: `Method ${method} Not Allowed` }),
                {
                    status: 405,
                    headers: { "Content-Type": "application/json", Allow: "GET, POST, PUT, DELETE" },
                }
            );
    }
}


export const POST = handler;