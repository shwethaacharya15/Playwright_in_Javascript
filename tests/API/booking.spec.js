import { test, expect } from '@playwright/test';

let token;
let bookingId;

test.describe('Booking API @regression', () => {
  test.beforeAll(async ({ request }) => {
    // Create token
    const authRes = await request.post('/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    token = (await authRes.json()).token;

    // Create booking
    const bookingRes = await request.post('/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        firstname: "John",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-09-01",
          checkout: "2025-09-10"
        },
        additionalneeds: "Breakfast"
      }
    });
    bookingId = (await bookingRes.json()).bookingid;
  });

  test('Update Booking', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: "Johnny",
        lastname: "Bravo",
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
          checkin: "2025-09-05",
          checkout: "2025-09-12"
        },
        additionalneeds: "Lunch"
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe("Johnny");
  });

  test('Partial Update Booking', async ({ request }) => {
    const res = await request.patch(`/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      data: { firstname: "Jimmy" }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe("Jimmy");
  });

  test('Delete Booking', async ({ request }) => {
    const res = await request.delete(`/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(res.status()).toBe(201);
  });
});
