

import userControllers from '../../../controllers/userController'

async function getUsers(request) {
    try {
        const response=await userControllers.getUsers()
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error) {
       
        return new Response(JSON.stringify({ error: "Failed to fetch users" || error }), {
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



export async function GET(request) {
    return getUsers(request);
}

export async function POST(request) {
    return createUser(request);
}
