const {householdControllers} = require("../../../../controllers/householdController");

async function getHousehold(request) {
    try {
        const householdId = request.url.split('/').pop(); 
        const response = await householdControllers.getHousehold(householdId);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch household" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
async function addTransaction(request) {
    try {
        const householdId = request.url.split('/').pop(); 
        const transactionData = await request.json();
        const response = await householdControllers.addTransactionToHousehold(householdId, transactionData);
        return new Response(JSON.stringify(response), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to add transaction" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
async function updateTransaction(request) {
    try {
        const householdId = request.url.split('/').pop(); 
        const transactionId = request.headers.get('Transaction-Id'); 
        const transactionData = await request.json();
        const response = await householdControllers.updateTransactionInHousehold(householdId, transactionId, transactionData);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update transaction" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
async function deleteTransaction(request) {
    try {
        const householdId = request.url.split('/').pop(); 
        const transactionId = request.headers.get('Transaction-Id');
        const response = await householdControllers.deleteTransactionFromHousehold(householdId, transactionId);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete transaction" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}






export async function handler(request)
{
    const { method } = request;

    switch (method) {
        case "GET":
            return getHousehold(request);

        case "POST":
            return addTransaction(request);

        case "PUT":
            return updateTransaction(request);

        case "DELETE":
            return deleteTransaction(request);

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
export const PUT = handler;
export const DELETE = handler;

