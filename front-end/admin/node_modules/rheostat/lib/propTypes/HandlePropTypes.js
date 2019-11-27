'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDefaultProps = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  'aria-valuemax': _propTypes2['default'].number,
  'aria-valuemin': _propTypes2['default'].number,
  'aria-valuenow': _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
  'aria-disabled': _propTypes2['default'].bool,
  'data-handle-key': _propTypes2['default'].node,
  orientation: _propTypes2['default'].string,
  disabled: _propTypes2['default'].bool,
  onClick: _propTypes2['default'].func,
  onKeyDown: _propTypes2['default'].func,
  onMouseDown: _propTypes2['default'].func,
  onTouchStart: _propTypes2['default'].func,
  handleRef: _propTypes2['default'].func,
  role: _propTypes2['default'].string,
  style: _propTypes2['default'].object,
  tabIndex: _propTypes2['default'].oneOf([-1, 0])
};
var handleDefaultProps = exports.handleDefaultProps = {
  handleRef: null,
  orientation: 'horizontal',
  disabled: false,
  'aria-valuenow': undefined,
  'data-handle-key': undefined,
  'aria-valuemax': undefined,
  'aria-valuemin': undefined,
  'aria-disabled': undefined,
  onClick: undefined,
  onKeyDown: undefined,
  onMouseDown: undefined,
  onTouchStart: undefined,
  role: undefined,
  tabIndex: undefined
};