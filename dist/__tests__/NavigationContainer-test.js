var _jsxFileName = 'src/__tests__/NavigationContainer-test.js';
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
require('react-native');
var _reactTestRenderer = require('react-test-renderer');
var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);
var _NavigationActions = require('../NavigationActions');
var _NavigationActions2 = _interopRequireDefault(_NavigationActions);
var _StackNavigator = require('../navigators/StackNavigator');
var _StackNavigator2 = _interopRequireDefault(_StackNavigator);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var FooScreen = function FooScreen() {
  return _react2.default.createElement('div', {
    __source: { fileName: _jsxFileName, lineNumber: 9 },
  });
};
var BarScreen = function BarScreen() {
  return _react2.default.createElement('div', {
    __source: { fileName: _jsxFileName, lineNumber: 10 },
  });
};
var BazScreen = function BazScreen() {
  return _react2.default.createElement('div', {
    __source: { fileName: _jsxFileName, lineNumber: 11 },
  });
};
var CarScreen = function CarScreen() {
  return _react2.default.createElement('div', {
    __source: { fileName: _jsxFileName, lineNumber: 12 },
  });
};
var DogScreen = function DogScreen() {
  return _react2.default.createElement('div', {
    __source: { fileName: _jsxFileName, lineNumber: 13 },
  });
};
var ElkScreen = function ElkScreen() {
  return _react2.default.createElement('div', {
    __source: { fileName: _jsxFileName, lineNumber: 14 },
  });
};
var NavigationContainer = (0, _StackNavigator2.default)(
  {
    foo: { screen: FooScreen },
    bar: { screen: BarScreen },
    baz: { screen: BazScreen },
    car: { screen: CarScreen },
    dog: { screen: DogScreen },
    elk: { screen: ElkScreen },
  },
  { initialRouteName: 'foo' }
);
jest.useFakeTimers();
describe('NavigationContainer', function() {
  describe('state.nav', function() {
    it("should be preloaded with the router's initial state", function() {
      var navigationContainer = _reactTestRenderer2.default
        .create(
          _react2.default.createElement(NavigationContainer, {
            __source: { fileName: _jsxFileName, lineNumber: 47 },
          })
        )
        .getInstance();
      expect(navigationContainer.state.nav).toMatchObject({ index: 0 });
      expect(navigationContainer.state.nav.routes).toBeInstanceOf(Array);
      expect(navigationContainer.state.nav.routes.length).toBe(1);
      expect(navigationContainer.state.nav.routes[0]).toMatchObject({
        routeName: 'foo',
      });
    });
  });
  describe('dispatch', function() {
    it('returns true when given a valid action', function() {
      var navigationContainer = _reactTestRenderer2.default
        .create(
          _react2.default.createElement(NavigationContainer, {
            __source: { fileName: _jsxFileName, lineNumber: 61 },
          })
        )
        .getInstance();
      jest.runOnlyPendingTimers();
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'bar' })
        )
      ).toEqual(true);
    });
    it('returns false when given an invalid action', function() {
      var navigationContainer = _reactTestRenderer2.default
        .create(
          _react2.default.createElement(NavigationContainer, {
            __source: { fileName: _jsxFileName, lineNumber: 73 },
          })
        )
        .getInstance();
      jest.runOnlyPendingTimers();
      expect(
        navigationContainer.dispatch(_NavigationActions2.default.back())
      ).toEqual(false);
    });
    it('updates state.nav with an action by the next tick', function() {
      var navigationContainer = _reactTestRenderer2.default
        .create(
          _react2.default.createElement(NavigationContainer, {
            __source: { fileName: _jsxFileName, lineNumber: 83 },
          })
        )
        .getInstance();
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'bar' })
        )
      ).toEqual(true);
      jest.runOnlyPendingTimers();
      expect(navigationContainer.state.nav).toMatchObject({
        index: 1,
        routes: [{ routeName: 'foo' }, { routeName: 'bar' }],
      });
    });
    it('does not discard actions when called twice in one tick', function() {
      var navigationContainer = _reactTestRenderer2.default
        .create(
          _react2.default.createElement(NavigationContainer, {
            __source: { fileName: _jsxFileName, lineNumber: 103 },
          })
        )
        .getInstance();
      var initialState = JSON.parse(
        JSON.stringify(navigationContainer.state.nav)
      );
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'bar' })
        )
      ).toEqual(true);
      expect(navigationContainer.state.nav).toMatchObject(initialState);
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'baz' })
        )
      ).toEqual(true);
      jest.runOnlyPendingTimers();
      expect(navigationContainer.state.nav).toMatchObject({
        index: 2,
        routes: [
          { routeName: 'foo' },
          { routeName: 'bar' },
          { routeName: 'baz' },
        ],
      });
    });
    it('does not discard actions when called more than 2 times in one tick', function() {
      var navigationContainer = _reactTestRenderer2.default
        .create(
          _react2.default.createElement(NavigationContainer, {
            __source: { fileName: _jsxFileName, lineNumber: 141 },
          })
        )
        .getInstance();
      var initialState = JSON.parse(
        JSON.stringify(navigationContainer.state.nav)
      );
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'bar' })
        )
      ).toEqual(true);
      expect(navigationContainer.state.nav).toMatchObject(initialState);
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'baz' })
        )
      ).toEqual(true);
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'car' })
        )
      ).toEqual(true);
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'dog' })
        )
      ).toEqual(true);
      expect(
        navigationContainer.dispatch(
          _NavigationActions2.default.navigate({ routeName: 'elk' })
        )
      ).toEqual(true);
      jest.runOnlyPendingTimers();
      expect(navigationContainer.state.nav).toMatchObject({
        index: 5,
        routes: [
          { routeName: 'foo' },
          { routeName: 'bar' },
          { routeName: 'baz' },
          { routeName: 'car' },
          { routeName: 'dog' },
          { routeName: 'elk' },
        ],
      });
    });
  });
});
