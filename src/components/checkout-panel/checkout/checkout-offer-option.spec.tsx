import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import CheckoutOfferOption from './checkout-offer-option';

describe('Test Checkout Offer Option Component', () => {
    const onClick = jest.fn();
    const cost = 4900;
    const checkoutId = 'test-checkout-id';

    // Matches snapshot
    test('Component matches snapshot', () => {
        const { asFragment } = render(
            <CheckoutOfferOption checkoutId={checkoutId} cost={cost} isDisabled={false} clickHandler={onClick} />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Component can call on click', () => {
        render(<CheckoutOfferOption checkoutId={checkoutId} cost={cost} isDisabled={false} clickHandler={onClick} />);

        expect(onClick).toHaveBeenCalledTimes(0);

        userEvent.click(screen.getByTestId('button'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('Component is disabled if disabled state is true', () => {
        render(<CheckoutOfferOption checkoutId={checkoutId} cost={cost} isDisabled={true} clickHandler={onClick} />);

        userEvent.click(screen.getByTestId('button'));

        expect(onClick).toHaveBeenCalledTimes(0);
    });
});
