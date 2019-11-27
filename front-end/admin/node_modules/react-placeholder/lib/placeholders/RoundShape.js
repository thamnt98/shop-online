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
var RoundShape = /** @class */ (function (_super) {
    __extends(RoundShape, _super);
    function RoundShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundShape.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, color = _a.color;
        var defaultStyles = {
            backgroundColor: color,
            borderRadius: '500rem',
            width: '100%',
            height: '100%'
        };
        var classes = ['round-shape', className].filter(function (c) { return c; }).join(' ');
        return (React.createElement("div", { className: classes, style: __assign({}, defaultStyles, style) }));
    };
    RoundShape.propTypes = {
        color: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: PropTypes.object
    };
    return RoundShape;
}(React.Component));
exports["default"] = RoundShape;
