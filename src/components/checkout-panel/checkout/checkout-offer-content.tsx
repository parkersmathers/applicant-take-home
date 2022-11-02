import React from 'react';

import './checkout-offer-content.less';

interface CheckoutOfferContentProps {
    cost: number;
    value: number;
    bonus: number;
}

const CheckoutOfferContent: React.FC<CheckoutOfferContentProps> = ({ cost, value, bonus }): React.ReactElement => {
    const dollarFormatter = (value: number) =>
        value.toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
        });

    const costAmount = dollarFormatter(cost / 100);
    const valueAmount = dollarFormatter(value / 100);
    const bonusAmount = dollarFormatter((value - cost) / 100);

    return (
        <div className="offer-content">
            <div className="offer-content__row">
                <span>Redemption Amount:</span> <span>{costAmount}</span>
            </div>
            <div className="offer-content__row offer-content--primary">
                <span>Prizeout Bonus (+{bonus}%):</span> <span>{bonusAmount}</span>
            </div>
            <div className="offer-content__row">
                <span>You Get:</span> <span>{valueAmount}</span>
            </div>
        </div>
    );
};

export default CheckoutOfferContent;
