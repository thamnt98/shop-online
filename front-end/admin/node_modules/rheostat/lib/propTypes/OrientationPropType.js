'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SliderConstants = require('../constants/SliderConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _propTypes2['default'].oneOf([_SliderConstants.HORIZONTAL, _SliderConstants.VERTICAL]);