import React from 'react';
import ClassNames from 'classnames';
import { useAppSelector } from '../../../hooks';
import { selectOfferValue } from '../../../slices/offers-slice';
import { Button } from '../../common';

interface CheckoutOfferOptionProps {
    checkoutId: string;
    cost: number;
    isDisabled: boolean;
    clickHandler: () => void;
}

const CheckoutOfferOption: React.FC<CheckoutOfferOptionProps> = ({
    checkoutId,
    cost,
    isDisabled,
    clickHandler,
}): React.ReactElement => {
    const selectedOfferValue = useAppSelector(selectOfferValue);

    const optionId = checkoutId;
    const activeOptionId = selectedOfferValue?.checkout_value_id;
    const color = activeOptionId === optionId ? 'primary' : '';
    const classes = ClassNames('mr-xs mb-xs');

    const amount = (cost / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

    return (
        <Button
            ariaLabel={amount}
            color={color}
            id={checkoutId}
            text={amount}
            size="small"
            type="button"
            className={classes}
            isDisabled={isDisabled}
            onClick={() => clickHandler()}
        />
    );
};

export default CheckoutOfferOption;
