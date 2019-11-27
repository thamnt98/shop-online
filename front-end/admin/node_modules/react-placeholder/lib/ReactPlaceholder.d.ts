import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type CommonProps = {
    children: React.ReactNode;
    /** pass `true` when the content is ready and `false` when it's loading */
    ready: boolean;
    /** delay in millis to wait when passing from ready to NOT ready */
    delay?: number;
    /** if true, the placeholder will never be rendered again once ready becomes true, even if it becomes false again */
    firstLaunchOnly?: boolean;
    className?: string;
    style?: React.CSSProperties;
};
export declare type Props = (CommonProps & {
    /** type of placeholder to use */
    type: 'text' | 'media' | 'textRow' | 'rect' | 'round';
    /** number of rows displayed in 'media' and 'text' placeholders */
    rows?: number;
    /** color of the placeholder */
    color?: string;
    /** pass true to show a nice loading animation on the placeholder */
    showLoadingAnimation?: boolean;
    customPlaceholder?: undefined;
}) | (CommonProps & {
    /** pass any renderable content to be used as placeholder instead of the built-in ones */
    customPlaceholder?: React.ReactNode | React.ReactElement<{
        [k: string]: any;
    }>;
    type?: undefined;
    rows?: undefined;
    color?: undefined;
    showLoadingAnimation?: undefined;
});
export default class ReactPlaceholder extends React.Component<Props> {
    static propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        delay: PropTypes.Requireable<number>;
        ready: PropTypes.Validator<boolean>;
        firstLaunchOnly: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        rows: PropTypes.Requireable<number>;
        color: PropTypes.Requireable<string>;
        showLoadingAnimation: PropTypes.Requireable<boolean>;
        customPlaceholder: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        delay: number;
        type: string;
        color: string;
    };
    state: {
        ready: boolean;
    };
    timeout?: number;
    getFiller: () => {};
    setNotReady: () => void;
    setReady: () => void;
    render(): {} | null | undefined;
    componentWillReceiveProps(nextProps: Props): void;
}
