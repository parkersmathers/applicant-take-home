import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { purchaseGiftCard, selectOffer, selectOfferValue, selectStatus } from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';
import { Button } from '../../common';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const dispatch = useDispatch<AppDispatch>();
    const offer = useAppSelector(selectOffer);
    const offerValue = useAppSelector(selectOfferValue);
    const offerStatus = useAppSelector(selectStatus);

    const isLoading = offerStatus === 'pending';

    const buttonHandler = () => {
        if (!offer && !offerValue) {
            return;
        }

        const { name } = offer;
        const { checkout_value_id, cost_in_cents, value_in_cents } = offerValue;
        dispatch(
            purchaseGiftCard({
                checkout_value_id,
                cost_in_cents,
                name,
                value_in_cents,
            }),
        );
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
                isLoading={isLoading}
            />
        </>
    );
};

export default CheckoutButton;
