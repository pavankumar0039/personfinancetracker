

import  householdControllers  from "../../../../controllers/householdController"

async function getHousehold(request) {
    try {
        const householdId = request.url.split('/').pop();
        const response = await householdControllers.getHousehold(householdId);
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch household" || error }), {
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
        return new Response(JSON.stringify({ error: "Failed to add transaction" || error }), {
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
        return new Response(JSON.stringify({ error: "Failed to update transaction"  || error}), {
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
        return new Response(JSON.stringify({ error: "Failed to delete transaction" || error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}






export async function GET(request) {
    return getHousehold(request);
}

export async function POST(request) {
    return addTransaction(request);
}

export async function PUT(request) {
    return updateTransaction(request);
}

export async function DELETE(request) {
    return deleteTransaction(request);
}

