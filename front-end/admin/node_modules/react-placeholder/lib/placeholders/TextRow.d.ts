import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Props = {
    maxHeight?: string | number;
    invisible?: boolean;
    className?: string;
    color: string;
    style?: React.CSSProperties;
    lineSpacing?: string | number;
};
export default class TextRow extends React.Component<Props> {
    static propTypes: {
        maxHeight: PropTypes.Requireable<string | number>;
        className: PropTypes.Requireable<string>;
        color: PropTypes.Validator<string>;
        lineSpacing: PropTypes.Requireable<string | number>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        lineSpacing: string;
    };
    render(): JSX.Element;
}
