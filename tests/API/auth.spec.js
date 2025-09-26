import { test, expect } from '@playwright/test';

test.describe('Auth API', () => {
  test('Create Token @smoke', async ({ request }) => {
    const response = await request.post('/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
  });
});
