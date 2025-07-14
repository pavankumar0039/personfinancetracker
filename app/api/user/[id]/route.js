import userControllers from '../../../../controllers/userController'


async function getUser(request) {
    try {
        const userId = request.url.split('/').pop(); // Extract user ID from URL
        const response = await userControllers.getUser(userId);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch user" || error}), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

}

async function updateUser(request) {
    try {

        const userId = request.url.split('/').pop();
        const userData = await request.json();
        const response = await userControllers.updateUser(userId, userData);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update user" || error}), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

}

async function deleteUser(request) {
    try {
        const userId = request.url.split('/').pop();
        const response = await userControllers.deleteUser(userId);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete user" || error}), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(request) {
    return getUser(request);
}

export async function PUT(request) {
    return updateUser(request);
}

export async function DELETE(request) {
    return deleteUser(request);
}