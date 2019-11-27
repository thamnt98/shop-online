import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Props = {
    color: string;
    style?: React.CSSProperties;
    className?: string;
};
export default class RoundShape extends React.Component<Props> {
    static propTypes: {
        color: PropTypes.Validator<string>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    render(): JSX.Element;
}
