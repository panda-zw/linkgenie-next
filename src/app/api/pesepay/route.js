const { Pesepay } = require("pesepay");
import { NextResponse } from 'next/server';

const pesepay = new Pesepay(
    process.env.NEXT_PUBLIC_PESEPAY_INTEGRATION_KEY,
    process.env.NEXT_PUBLIC_PESEPAY_ENCRYPTION_KEY
);

pesepay.resultUrl = 'https://localhost:3000/api/payment-callback';
pesepay.returnUrl = 'http://localhost:3000/Generate';

async function updateUserPlan(userId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/update-user-plan/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update user plan');
        }

        const result = await response.json();
        console.log('User plan update result:', result);
    } catch (error) {
        console.error('Error updating user plan:', error);
    }
}

export async function POST(req) {
    const { amount, currencyCode, userId } = await req.json();

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

        // Start polling for payment status, passing the user's ID
        startPollingPaymentStatus(referenceNumber, userId);

        return NextResponse.json({
            redirectUrl,
            referenceNumber,
            pollUrl
        }, { status: 200 });

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

async function checkPaymentStatus(referenceNumber, userId) {
    try {
        const response = await pesepay.checkPayment(referenceNumber);
        console.log("Payment check response:", response);

        if (response.success) {
            if (response.paid) {
                console.log("Payment successful for reference:", referenceNumber);

                // Call the new API to update user plan and credits
                await updateUserPlan(userId);

                return true;
            } else {
                console.log("Payment still pending for reference:", referenceNumber);
                return false;
            }
        } else {
            console.log("Error checking payment status:", response.message);
            return false;
        }
    } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
    }
}

function startPollingPaymentStatus(referenceNumber, userId) {
    const pollInterval = 10000; // 10 seconds
    const maxAttempts = 30; // 5 minutes total
    let attempts = 0;

    const poll = async () => {
        if (attempts >= maxAttempts) {
            console.log("Max polling attempts reached for reference:", referenceNumber);
            return;
        }

        const isPaid = await checkPaymentStatus(referenceNumber, userId);
        if (isPaid) {
            console.log("Payment completed for reference:", referenceNumber);
            // The user plan update is now handled in checkPaymentStatus
        } else {
            attempts++;
            setTimeout(poll, pollInterval);
        }
    };

    poll();
}
