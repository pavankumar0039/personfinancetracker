const {userControllers} = require("../../../controllers/userController");

async function getUsers(request) {
    try {
        const response=await userControllers.getUsers()
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error) {
       
        return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });

        
    }
    
}



async function createUser(request) {
    try {
        const userData = await request.json();
        const response = await userControllers.createUser(userData);
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
        case "GET":
            return getUsers(request);

        case "POST":
            return createUser(request);

        
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


export const GET = handler;
export const POST = handler;

