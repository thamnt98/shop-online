import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Props = {
    rows: number;
    color: string;
    style?: React.CSSProperties;
    className?: string;
};
export default class MediaBlock extends React.Component<Props> {
    static propTypes: {
        rows: PropTypes.Validator<number>;
        color: PropTypes.Validator<string>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
    };
    render(): JSX.Element;
}
