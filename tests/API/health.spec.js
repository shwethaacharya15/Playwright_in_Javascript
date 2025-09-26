import { test, expect } from '@playwright/test';

test('Health Check @smoke', async ({ request }) => {
  const res = await request.get('/ping');
  expect(res.status()).toBe(201);
});
