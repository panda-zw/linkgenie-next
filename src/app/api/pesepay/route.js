const { Pesepay } = require("pesepay");

const pesepay = new Pesepay(
    process.env.NEXT_PUBLIC_PESEPAY_INTEGRATION_KEY,
    process.env.NEXT_PUBLIC_PESEPAY_ENCRYPTION_KEY
);

pesepay.resultUrl = 'https://localhost:3000/api/payment-callback';
pesepay.returnUrl = 'http://localhost:3000/Generate';

export async function POST(request) {
    const { amount, currencyCode, email, userId } = await request.json();
    console.log("Received userId:", userId);

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

        // Start the payment status check in the background
        checkPaymentStatus(referenceNumber, userId).then(status => {
            console.log(`Final payment status for ${referenceNumber}:`, status);
            // Here you could update a database or send a webhook with the final status
        }).catch(error => {
            console.error(`Error in background payment check for ${referenceNumber}:`, error);
        });

        // Immediately return the redirect URL and other details
        return new Response(JSON.stringify({
            redirectUrl,
            referenceNumber,
            pollUrl,
            message: "Redirect URL generated successfully. Payment status will be checked in the background."
        }), { status: 200 });

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


async function checkPaymentStatus(reference, userId, maxAttempts = 10, interval = 5000) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const response = await pesepay.checkPayment(reference);
            console.log(`Payment check response (attempt ${attempt + 1}):`, response);

            if (response.success) {
                if (response.paid) {
                    console.log("Payment successful for reference:", reference);

                    // Update user credits and plan
                    const updateUrl = `${baseUrl}/api/update-user`;
                    console.log("Update URL:", updateUrl);

                    const updateBody = JSON.stringify({
                        userId: userId,
                        updateCredits: true,
                        updatePlan: true
                    });
                    console.log("Update body:", updateBody);

                    const updateResponse = await fetch(updateUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: updateBody,
                    });

                    console.log("Update response status:", updateResponse.status);
                    console.log("Update response headers:", updateResponse.headers);

                    if (updateResponse.ok) {
                        console.log("User credits and plan updated successfully");
                        const responseData = await updateResponse.json();
                        console.log("Update response data:", responseData);
                    } else {
                        console.error("Failed to update user credits and plan");
                        const errorText = await updateResponse.text();
                        console.error("Error response:", errorText);
                    }

                    return { status: 'success', message: 'Payment successful' };
                } else if (response.status === 'FAILED') {
                    console.log("Payment failed for reference:", reference);
                    return { status: 'failed', message: 'Payment failed' };
                }
            }

            console.log("Payment still pending for reference:", reference);
            await new Promise(resolve => setTimeout(resolve, interval));
        } catch (error) {
            console.error("Error checking payment status:", error);
        }

    }

    return { status: 'timeout', message: 'Payment status check timed out' };
}
