const { Pesepay } = require("pesepay");

const pesepay = new Pesepay(
    process.env.NEXT_PUBLIC_PESEPAY_INTEGRATION_KEY,
    process.env.NEXT_PUBLIC_PESEPAY_ENCRYPTION_KEY
);

pesepay.resultUrl = 'https://localhost:3000/api/payment-callback';
pesepay.returnUrl = 'http://localhost:3000/';

export async function POST(req) {
    const { amount, currencyCode, email } = await req.json();

    // Generate a unique reference for each transaction
    const uniqueReference = `TS${Date.now()}`;

    const transaction = pesepay.createTransaction(amount, currencyCode, "pesepay payment", uniqueReference);

    console.log("Transaction details being sent to PesePay:", transaction);

    try {
        const response = await pesepay.initiateTransaction(transaction);
        console.log("PesePay response:", response);

        if (!response.success) {
            throw new Error(response.message || "Transaction initiation failed");
        }

        const { redirectUrl, referenceNumber, pollUrl } = response;
        console.log("Redirect URL:", redirectUrl);
        console.log("Reference Number:", referenceNumber);
        console.log("Poll URL:", pollUrl);

        if (!redirectUrl || !referenceNumber) {
            throw new Error("Missing redirect URL or reference number");
        }

        return new Response(JSON.stringify({ redirectUrl, referenceNumber, pollUrl }), { status: 200 });

    } catch (error) {
        console.error("Error processing transaction:", error);

        const errorResponse = {
            error: error.message,
            details: "Failed to initiate transaction with PesePay. Please try again.",
            transactionDetails: transaction,
            pesepayResponse: error.response ? error.response.data : null
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
