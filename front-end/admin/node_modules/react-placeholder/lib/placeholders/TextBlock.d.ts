import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type DefaultedProps = Props & {
    widths: NonNullable<Props['widths']>;
};
export declare type Props = {
    rows: number;
    color: string;
    lineSpacing?: string | number;
    widths?: number[];
    style?: React.CSSProperties;
    className?: string;
};
export default class TextBlock extends React.Component<Props> {
    static propTypes: {
        rows: PropTypes.Validator<number>;
        color: PropTypes.Validator<string>;
        lineSpacing: PropTypes.Requireable<string | number>;
        widths: PropTypes.Requireable<(number | null)[]>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
    };
    static defaultProps: Partial<Props>;
    getRowStyle: (i: number) => {
        maxHeight: string;
        width: string;
    };
    getRows: () => JSX.Element[];
    render(): JSX.Element;
}
