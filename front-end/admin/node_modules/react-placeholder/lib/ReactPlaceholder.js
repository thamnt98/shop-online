"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var React = require("react");
var PropTypes = require("prop-types");
var placeholders = require("./placeholders");
var ReactPlaceholder = /** @class */ (function (_super) {
    __extends(ReactPlaceholder, _super);
    function ReactPlaceholder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            ready: _this.props.ready
        };
        _this.getFiller = function () {
            var _a = _this.props, firstLaunchOnly = _a.firstLaunchOnly, children = _a.children, ready = _a.ready, className = _a.className, // eslint-disable-line no-unused-vars
            type = _a.type, customPlaceholder = _a.customPlaceholder, showLoadingAnimation = _a.showLoadingAnimation, rest = __rest(_a, ["firstLaunchOnly", "children", "ready", "className", "type", "customPlaceholder", "showLoadingAnimation"]);
            var classes = showLoadingAnimation ?
                ['show-loading-animation', className].filter(function (c) { return c; }).join(' ') :
                className;
            if (customPlaceholder && React.isValidElement(customPlaceholder)) {
                var mergedCustomClasses = [
                    customPlaceholder.props.className,
                    classes
                ].filter(function (c) { return c; }).join(' ');
                return React.cloneElement(customPlaceholder, { className: mergedCustomClasses });
            }
            else if (customPlaceholder) {
                return customPlaceholder;
            }
            var Placeholder = placeholders[type];
            return React.createElement(Placeholder, __assign({}, rest, { className: classes }));
        };
        _this.setNotReady = function () {
            var delay = _this.props.delay;
            if (delay && delay > 0) {
                _this.timeout = window.setTimeout(function () {
                    _this.setState({ ready: false });
                }, delay);
            }
            else {
                _this.setState({ ready: false });
            }
        };
        _this.setReady = function () {
            if (_this.timeout) {
                window.clearTimeout(_this.timeout);
            }
            if (!_this.state.ready) {
                _this.setState({ ready: true });
            }
        };
        return _this;
    }
    ReactPlaceholder.prototype.render = function () {
        return this.state.ready ? this.props.children : this.getFiller();
    };
    ReactPlaceholder.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.props.firstLaunchOnly && this.state.ready && !nextProps.ready) {
            this.setNotReady();
        }
        else if (nextProps.ready) {
            this.setReady();
        }
    };
    ReactPlaceholder.propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.element
        ]).isRequired,
        delay: PropTypes.number,
        ready: PropTypes.bool.isRequired,
        firstLaunchOnly: PropTypes.bool,
        type: PropTypes.oneOf(['text', 'media', 'textRow', 'rect', 'round']),
        rows: PropTypes.number,
        color: PropTypes.string,
        showLoadingAnimation: PropTypes.bool,
        customPlaceholder: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.element
        ]),
        className: PropTypes.string,
        style: PropTypes.object
    };
    ReactPlaceholder.defaultProps = {
        delay: 0,
        type: 'text',
        color: '#CDCDCD'
    };
    return ReactPlaceholder;
}(React.Component));
exports["default"] = ReactPlaceholder;
