export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    // Extract form fields
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'Not provided',
      program: formData.get('program') || 'Not selected',
      message: formData.get('message') || 'No message',
      timestamp: new Date().toISOString()
    };

    // Send email via Resend
    // Get API key from environment variable (set in Cloudflare Pages dashboard)
    const resendApiKey = context.env.RESEND_API_KEY;

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Northern Karate Princeton <onboarding@resend.dev>', // You'll need to verify your domain or use this test domain
        to: ['harpo16352@gmail.com'], // Hart's verified Resend email
        reply_to: data.email, // Allow you to reply directly to the person who submitted
        subject: `New Trial Class Request from ${data.firstName} ${data.lastName}`,
        html: `
          <h2>New Trial Class Request</h2>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Current Level:</strong> ${data.program}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
          <hr>
          <p><small>Submitted on ${new Date(data.timestamp).toLocaleString()}</small></p>
        `
      })
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    console.log('Form submission received and email sent:', data);

    // Redirect to homepage with success message
    return new Response(null, {
      status: 303,
      headers: {
        'Location': '/?submitted=true'
      }
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit form' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
