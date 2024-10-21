export async function GET() {
    return new Response('This endpoint only supports POST requests.', { status: 405 });
  }
  
  export async function POST(req) {
    try {
      const { transaction_id, status } = await req.json();
  
      if (status === 'SUCCESS') {
        // Handle successful payment
        return new Response('Payment successful', { status: 200 });
      } else {
        // Handle failure
        return new Response('Payment failed', { status: 400 });
      }
    } catch (error) {
      return new Response('Error processing request', { status: 500 });
    }
  }
  