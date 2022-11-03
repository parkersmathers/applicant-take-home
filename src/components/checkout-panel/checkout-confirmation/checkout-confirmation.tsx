import React from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import { selectIsCheckoutPanelCollapsed } from '../../../slices/common-slice';
import { useAppSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { toggleIsCollapsedCheckoutPanelOpen } from '../../../slices/checkout-slice';
import { Button } from '../../common';

import './checkout-confirmation.less';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);

    const clickHandler = () => {
        setView('checkout');
        if (isCheckoutPanelCollapsedView) {
            // close checkout panel in mobile view
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    return (
        <section className="checkout-confirmation">
            <div className="checkout-confirmation__content">
                <h2>Checkout successful!</h2>
                <Button
                    ariaLabel="Done"
                    text="Done"
                    color="confirm"
                    size="small"
                    isInline={true}
                    type="button"
                    onClick={() => clickHandler()}
                />
            </div>
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
