import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Props = {
    color?: string;
    className?: string;
    style?: React.CSSProperties;
};
export default class RectShape extends React.Component<Props> {
    static propTypes: {
        color: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    render(): JSX.Element;
}
