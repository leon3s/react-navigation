Object.defineProperty(exports, '__esModule', { value: true });
var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
var _jsxFileName = 'src/navigators/StackNavigator.js';
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _createNavigationContainer = require('../createNavigationContainer');
var _createNavigationContainer2 = _interopRequireDefault(
  _createNavigationContainer
);
var _createNavigator = require('./createNavigator');
var _createNavigator2 = _interopRequireDefault(_createNavigator);
var _CardStackTransitioner = require('../views/CardStack/CardStackTransitioner');
var _CardStackTransitioner2 = _interopRequireDefault(_CardStackTransitioner);
var _StackRouter = require('../routers/StackRouter');
var _StackRouter2 = _interopRequireDefault(_StackRouter);
var _NavigationActions = require('../NavigationActions');
var _NavigationActions2 = _interopRequireDefault(_NavigationActions);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
exports.default = function(routeConfigMap) {
  var stackConfig =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var initialRouteName = stackConfig.initialRouteName,
    initialRouteParams = stackConfig.initialRouteParams,
    paths = stackConfig.paths,
    headerMode = stackConfig.headerMode,
    mode = stackConfig.mode,
    cardStyle = stackConfig.cardStyle,
    transitionConfig = stackConfig.transitionConfig,
    onTransitionStart = stackConfig.onTransitionStart,
    _onTransitionEnd = stackConfig.onTransitionEnd,
    navigationOptions = stackConfig.navigationOptions;
  var stackRouterConfig = {
    initialRouteName: initialRouteName,
    initialRouteParams: initialRouteParams,
    paths: paths,
    navigationOptions: navigationOptions,
  };
  var router = (0, _StackRouter2.default)(routeConfigMap, stackRouterConfig);
  var navigator = (0, _createNavigator2.default)(
    router,
    routeConfigMap,
    stackConfig
  )(function(props) {
    return _react2.default.createElement(
      _CardStackTransitioner2.default,
      _extends({}, props, {
        headerMode: headerMode,
        mode: mode,
        cardStyle: cardStyle,
        transitionConfig: transitionConfig,
        onTransitionStart: onTransitionStart,
        onTransitionEnd: function onTransitionEnd(lastTransition, transition) {
          var _props$navigation = props.navigation,
            state = _props$navigation.state,
            dispatch = _props$navigation.dispatch;
          dispatch(_NavigationActions2.default.completeTransition());
          _onTransitionEnd && _onTransitionEnd();
        },
        __source: { fileName: _jsxFileName, lineNumber: 38 },
      })
    );
  });
  return (0, _createNavigationContainer2.default)(navigator);
};
