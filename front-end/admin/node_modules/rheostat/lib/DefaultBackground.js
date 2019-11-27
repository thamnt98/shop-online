'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _SliderConstants = require('./constants/SliderConstants');

var _OrientationPropType = require('./propTypes/OrientationPropType');

var _OrientationPropType2 = _interopRequireDefault(_OrientationPropType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  orientation: _OrientationPropType2['default']
}));

var defaultProps = {
  orientation: _SliderConstants.HORIZONTAL
};

function DefaultBackground(_ref) {
  var css = _ref.css,
      orientation = _ref.orientation,
      styles = _ref.styles;

  return _react2['default'].createElement('div', css(styles.DefaultBackground, orientation === _SliderConstants.VERTICAL ? styles.DefaultBackground_background__vertical : styles.DefaultBackground_background__horizontal));
}
DefaultBackground.propTypes = propTypes;
DefaultBackground.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$rheostat = _ref2.rheostat,
      color = _ref2$rheostat.color,
      unit = _ref2$rheostat.unit;
  return {
    DefaultBackground: {
      backgroundColor: color.white,
      height: 2 * unit - 1,
      width: '100%',
      border: '1px solid ' + String(color.grey),
      position: 'relative'
    },

    DefaultBackground_background__horizontal: {
      height: 2 * unit - 1,
      top: -2,
      left: -2,
      bottom: 4,
      width: '100%'
    },

    DefaultBackground_background__vertical: {
      width: 2 * unit - 1,
      top: 0,
      height: '100%'
    }
  };
})(DefaultBackground);