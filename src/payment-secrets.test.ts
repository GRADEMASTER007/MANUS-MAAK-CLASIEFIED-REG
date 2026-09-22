import { describe, expect, it } from 'vitest';

describe('payment gateway secret validation', () => {
  it('authenticates the configured PayPal application without creating a payment', async () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    expect(clientId, 'PAYPAL_CLIENT_ID must be configured').toBeTruthy();
    expect(clientSecret, 'PAYPAL_CLIENT_SECRET must be configured').toBeTruthy();

    const endpoints = [
      'https://api-m.paypal.com/v1/oauth2/token',
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    ];
    const results = await Promise.all(endpoints.map(async (endpoint) => fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      signal: AbortSignal.timeout(15_000),
    })));

    expect(results.some((response) => response.ok), `PayPal OAuth rejected both configured endpoints: ${results.map((response) => response.status).join(', ')}`).toBe(true);
  }, 20_000);
});
