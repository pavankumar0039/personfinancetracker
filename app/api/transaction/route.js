

import householdControllers from "../../../controllers/householdController"

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
        return new Response(JSON.stringify({ error: "Failed to fetch households" || error }), {
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
        return new Response(JSON.stringify({ error: "Failed to create household" || error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
export async function GET(request) {
    return getHouseholds(request);
}

export async function POST(request) {
    return createHousehold(request);
}

