/* eslint-disable sort-keys */

export type CheckoutItem = {
    checkout_value_id: string;
    cost_in_cents: number;
    value_in_cents: number;
    name: string;
};

export type CheckoutResponse = { ok: boolean; error?: string };

export async function checkoutOffer(item: CheckoutItem): Promise<CheckoutResponse> {
    const url = `/api/prizeout`;

    await sleep(2000);

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(item),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Something went wrong');
    }
    console.log(response, data);

    return data as CheckoutResponse;
}

// simulate API call
const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
