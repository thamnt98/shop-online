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
var TextBlock_1 = require("./TextBlock");
var RoundShape_1 = require("./RoundShape");
var MediaBlock = /** @class */ (function (_super) {
    __extends(MediaBlock, _super);
    function MediaBlock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaBlock.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, color = _a.color, rows = _a.rows;
        var defaultStyles = {
            display: 'flex'
        };
        var classes = ['media-block', className].filter(function (c) { return c; }).join(' ');
        return (React.createElement("div", { className: classes, style: __assign({}, defaultStyles, style) },
            React.createElement(RoundShape_1["default"], { color: color, style: { minHeight: 55, width: 55, minWidth: 55, marginRight: 10 } }),
            React.createElement(TextBlock_1["default"], { color: color, rows: rows })));
    };
    MediaBlock.propTypes = {
        rows: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        style: PropTypes.object,
        className: PropTypes.string
    };
    return MediaBlock;
}(React.Component));
exports["default"] = MediaBlock;
