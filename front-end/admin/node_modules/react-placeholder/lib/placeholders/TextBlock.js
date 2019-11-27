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
var TextRow_1 = require("./TextRow");
var TextBlock = /** @class */ (function (_super) {
    __extends(TextBlock, _super);
    function TextBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRowStyle = function (i) {
            var _a = _this.props, rows = _a.rows, widths = _a.widths;
            return {
                maxHeight: (100 / (rows * 2 - 1)) + "%",
                width: widths[(i + widths.length) % widths.length] + "%"
            };
        };
        _this.getRows = function () {
            var _a = _this.props, rows = _a.rows, lineSpacing = _a.lineSpacing, color = _a.color;
            var range = Array.apply(null, Array(rows));
            return range.map(function (_, i) { return (React.createElement(TextRow_1["default"], { color: color, style: _this.getRowStyle(i), lineSpacing: i !== 0 ? lineSpacing : 0, key: i })); });
        };
        return _this;
    }
    TextBlock.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className;
        var defaultStyles = {
            width: '100%'
        };
        var classes = ['text-block', className].filter(function (c) { return c; }).join(' ');
        return (React.createElement("div", { className: classes, style: __assign({}, defaultStyles, style) }, this.getRows()));
    };
    TextBlock.propTypes = {
        rows: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        lineSpacing: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        widths: PropTypes.arrayOf(PropTypes.number),
        style: PropTypes.object,
        className: PropTypes.string
    };
    TextBlock.defaultProps = {
        widths: [97, 100, 94, 90, 98, 95, 98, 40]
    };
    return TextBlock;
}(React.Component));
exports["default"] = TextBlock;
