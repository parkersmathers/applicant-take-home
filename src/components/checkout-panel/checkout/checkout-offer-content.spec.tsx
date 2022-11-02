import { render } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import CheckoutOfferContent from './checkout-offer-content';

describe('Test Checkout Offer Content Component', () => {
    // Matches snapshot
    test('Component matches snapshot', () => {
        const { asFragment } = render(<CheckoutOfferContent cost={4900} value={5000} bonus={2.04} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
