import React, { useEffect } from 'react';
import ClassNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { setCheckoutView } from '../../../slices/checkout-slice';
import {
    PrizeoutOfferValueOptions,
    selectOffer,
    selectOfferValue,
    selectStatus,
    setSelectedOfferValue,
} from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';
import { GiftCard } from '../../common';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import CheckoutOfferOption from './checkout-offer-option';
import CheckoutOfferContent from './checkout-offer-content';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const offer = useAppSelector(selectOffer);
    const offerValue = useAppSelector(selectOfferValue);
    const offerStatus = useAppSelector(selectStatus);

    const classes = ClassNames('grid__item', { checkout__active: offerValue !== null });

    useEffect(() => {
        if (offer && !offerValue) {
            const option = offer.giftcard_list[0];
            dispatch(setSelectedOfferValue(option));
        }
    }, [offer, offerValue]);

    useEffect(() => {
        if (offerStatus === 'succeeded') {
            // when gift card is successfully purchased show confirmation view
            dispatch(setCheckoutView('checkout-confirmation'));
        }
    }, [offerStatus]);

    const onClickHandler = (option: PrizeoutOfferValueOptions) => {
        dispatch(setSelectedOfferValue(option));
    };

    const returnOptions = () => {
        return offer.giftcard_list.map((option) => (
            <CheckoutOfferOption
                key={option.checkout_value_id}
                checkoutId={option.checkout_value_id}
                cost={option.cost_in_cents}
                isDisabled={offerStatus === 'pending'}
                clickHandler={() => onClickHandler(option)}
            />
        ));
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className={classes}>
                    <section className="checkout__brand">
                        {offer && (
                            <GiftCard
                                name={offer.name}
                                imgUrl={offer.image_url}
                                altText={offer.name}
                                className="offer"
                            />
                        )}
                    </section>
                    {offer && (
                        <div className="checkout__options">
                            <h4>Select Redemption Amount</h4>
                            <div>{returnOptions()}</div>
                        </div>
                    )}
                    {offerValue && (
                        <CheckoutOfferContent
                            cost={offerValue.cost_in_cents}
                            value={offerValue.value_in_cents}
                            bonus={offerValue.display_bonus}
                        />
                    )}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
