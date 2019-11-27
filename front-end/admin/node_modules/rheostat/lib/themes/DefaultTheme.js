'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var core = {
  black: 'black',
  white: '#fcfcfc',
  grey: '#d8d8d8',
  teal: '#abc4e8',
  lightgrey: '#dbdbdb'
};

var DefaultTheme = {
  rheostat: {
    unit: 8,

    responsive: {
      mediumAndAbove: '@media (min-width: 744px)',
      largeAndAbove: '@media (min-width: 1128px)'
    },

    constants: {
      DEFAULT_HANDLE_WIDTH: 1.5,
      BACKGROUND_HEIGHT: 0.25
    },

    color: (0, _object2['default'])({}, core, {
      progressBar: core.teal,
      focus: core.teal,
      textDisabled: core.lightgrey,

      buttons: {
        defaultDisabledColor: core.lightgrey
      }
    })
  }
};

exports['default'] = DefaultTheme;