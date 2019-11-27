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
exports.__esModule = true;
var React = require("react");
var PropTypes = require("prop-types");
var TextRow = /** @class */ (function (_super) {
    __extends(TextRow, _super);
    function TextRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextRow.prototype.render = function () {
        var _a = this.props, className = _a.className, maxHeight = _a.maxHeight, color = _a.color, lineSpacing = _a.lineSpacing, style = _a.style;
        var defaultStyles = {
            maxHeight: maxHeight,
            width: '100%',
            height: '1em',
            backgroundColor: color,
            marginTop: lineSpacing
        };
        var classes = ['text-row', className].filter(function (c) { return c; }).join(' ');
        return (React.createElement("div", { className: classes, style: __assign({}, defaultStyles, style) }));
    };
    TextRow.propTypes = {
        maxHeight: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        className: PropTypes.string,
        color: PropTypes.string.isRequired,
        lineSpacing: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        style: PropTypes.object
    };
    TextRow.defaultProps = {
        lineSpacing: '0.7em'
    };
    return TextRow;
}(React.Component));
exports["default"] = TextRow;
