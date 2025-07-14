const { householdControllers } = require("../../../controllers/householdController");

async function getHouseholds(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const response = await householdControllers.getHouseholds(userId);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch households" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
async function createHousehold(request) {
    try {
        const householdData = await request.json();
        const response = await householdControllers.createHousehold(householdData);
        return new Response(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to create household" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
export async function handler(request) {
    const { method } = request;

    switch (method) {
        case "GET":
            return getHouseholds(request);

        case "POST":
            return createHousehold(request);

        default:
            return new Response(
                JSON.stringify({ error: `Method ${method} Not Allowed` }),
                {
                    status: 405,
                    headers: { "Content-Type": "application/json" },
                }
            );
    }
}

export const GET = handler;
export const POST = handler;



