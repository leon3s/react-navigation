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
var _getChildEventSubscriber = require('../getChildEventSubscriber');
var _getChildEventSubscriber2 = _interopRequireDefault(
  _getChildEventSubscriber
);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
test('child action events only flow when focused', function() {
  var parentSubscriber = jest.fn();
  var emitParentAction = function emitParentAction(payload) {
    parentSubscriber.mock.calls.forEach(function(subs) {
      if (subs[0] === payload.type) {
        subs[1](payload);
      }
    });
  };
  var subscriptionRemove = function subscriptionRemove() {};
  parentSubscriber.mockReturnValueOnce({ remove: subscriptionRemove });
  var childEventSubscriber = (0, _getChildEventSubscriber2.default)(
    parentSubscriber,
    'key1'
  );
  var testState = {
    key: 'foo',
    routeName: 'FooRoute',
    routes: [{ key: 'key0' }, { key: 'key1' }],
    index: 0,
    isTransitioning: false,
  };
  var focusedTestState = _extends({}, testState, { index: 1 });
  var childActionHandler = jest.fn();
  var childWillFocusHandler = jest.fn();
  var childDidFocusHandler = jest.fn();
  childEventSubscriber('action', childActionHandler);
  childEventSubscriber('willFocus', childWillFocusHandler);
  childEventSubscriber('didFocus', childDidFocusHandler);
  emitParentAction({
    type: 'action',
    state: focusedTestState,
    lastState: testState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  emitParentAction({
    type: 'action',
    state: focusedTestState,
    lastState: focusedTestState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(1);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
});
test('grandchildren subscription', function() {
  var grandParentSubscriber = jest.fn();
  var emitGrandParentAction = function emitGrandParentAction(payload) {
    grandParentSubscriber.mock.calls.forEach(function(subs) {
      if (subs[0] === payload.type) {
        subs[1](payload);
      }
    });
  };
  var subscriptionRemove = function subscriptionRemove() {};
  grandParentSubscriber.mockReturnValueOnce({ remove: subscriptionRemove });
  var parentSubscriber = (0, _getChildEventSubscriber2.default)(
    grandParentSubscriber,
    'parent'
  );
  var childEventSubscriber = (0, _getChildEventSubscriber2.default)(
    parentSubscriber,
    'key1'
  );
  var parentBlurState = {
    key: 'foo',
    routeName: 'FooRoute',
    routes: [
      { key: 'aunt' },
      {
        key: 'parent',
        routes: [{ key: 'key0' }, { key: 'key1' }],
        index: 1,
        isTransitioning: false,
      },
    ],
    index: 0,
    isTransitioning: false,
  };
  var parentTransitionState = _extends({}, parentBlurState, {
    index: 1,
    isTransitioning: true,
  });
  var parentFocusState = _extends({}, parentTransitionState, {
    isTransitioning: false,
  });
  var childActionHandler = jest.fn();
  var childWillFocusHandler = jest.fn();
  var childDidFocusHandler = jest.fn();
  childEventSubscriber('action', childActionHandler);
  childEventSubscriber('willFocus', childWillFocusHandler);
  childEventSubscriber('didFocus', childDidFocusHandler);
  emitGrandParentAction({
    type: 'action',
    state: parentTransitionState,
    lastState: parentBlurState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(0);
  emitGrandParentAction({
    type: 'action',
    state: parentFocusState,
    lastState: parentTransitionState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
});
test('grandchildren transitions', function() {
  var grandParentSubscriber = jest.fn();
  var emitGrandParentAction = function emitGrandParentAction(payload) {
    grandParentSubscriber.mock.calls.forEach(function(subs) {
      if (subs[0] === payload.type) {
        subs[1](payload);
      }
    });
  };
  var subscriptionRemove = function subscriptionRemove() {};
  grandParentSubscriber.mockReturnValueOnce({ remove: subscriptionRemove });
  var parentSubscriber = (0, _getChildEventSubscriber2.default)(
    grandParentSubscriber,
    'parent'
  );
  var childEventSubscriber = (0, _getChildEventSubscriber2.default)(
    parentSubscriber,
    'key1'
  );
  var makeFakeState = function makeFakeState(childIndex, childIsTransitioning) {
    return {
      index: 1,
      isTransitioning: false,
      routes: [
        { key: 'nothing' },
        {
          key: 'parent',
          index: childIndex,
          isTransitioning: childIsTransitioning,
          routes: [{ key: 'key0' }, { key: 'key1' }, { key: 'key2' }],
        },
      ],
    };
  };
  var blurredState = makeFakeState(0, false);
  var transitionState = makeFakeState(1, true);
  var focusState = makeFakeState(1, false);
  var transition2State = makeFakeState(2, true);
  var blurred2State = makeFakeState(2, false);
  var childActionHandler = jest.fn();
  var childWillFocusHandler = jest.fn();
  var childDidFocusHandler = jest.fn();
  var childWillBlurHandler = jest.fn();
  var childDidBlurHandler = jest.fn();
  childEventSubscriber('action', childActionHandler);
  childEventSubscriber('willFocus', childWillFocusHandler);
  childEventSubscriber('didFocus', childDidFocusHandler);
  childEventSubscriber('willBlur', childWillBlurHandler);
  childEventSubscriber('didBlur', childDidBlurHandler);
  emitGrandParentAction({
    type: 'action',
    state: transitionState,
    lastState: blurredState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(0);
  emitGrandParentAction({
    type: 'action',
    state: focusState,
    lastState: transitionState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  emitGrandParentAction({
    type: 'action',
    state: focusState,
    lastState: focusState,
    action: { type: 'TestAction' },
  });
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  expect(childActionHandler.mock.calls.length).toBe(1);
  emitGrandParentAction({
    type: 'action',
    state: transition2State,
    lastState: focusState,
    action: { type: 'CauseWillBlurAction' },
  });
  expect(childWillBlurHandler.mock.calls.length).toBe(1);
  expect(childDidBlurHandler.mock.calls.length).toBe(0);
  expect(childActionHandler.mock.calls.length).toBe(1);
  emitGrandParentAction({
    type: 'action',
    state: blurred2State,
    lastState: transition2State,
    action: { type: 'CauseDidBlurAction' },
  });
  expect(childWillBlurHandler.mock.calls.length).toBe(1);
  expect(childDidBlurHandler.mock.calls.length).toBe(1);
  expect(childActionHandler.mock.calls.length).toBe(1);
});
test('grandchildren pass through transitions', function() {
  var grandParentSubscriber = jest.fn();
  var emitGrandParentAction = function emitGrandParentAction(payload) {
    grandParentSubscriber.mock.calls.forEach(function(subs) {
      if (subs[0] === payload.type) {
        subs[1](payload);
      }
    });
  };
  var subscriptionRemove = function subscriptionRemove() {};
  grandParentSubscriber.mockReturnValueOnce({ remove: subscriptionRemove });
  var parentSubscriber = (0, _getChildEventSubscriber2.default)(
    grandParentSubscriber,
    'parent'
  );
  var childEventSubscriber = (0, _getChildEventSubscriber2.default)(
    parentSubscriber,
    'key1'
  );
  var makeFakeState = function makeFakeState(childIndex, childIsTransitioning) {
    return {
      index: childIndex,
      isTransitioning: childIsTransitioning,
      routes: [
        { key: 'nothing' },
        {
          key: 'parent',
          index: 1,
          isTransitioning: false,
          routes: [{ key: 'key0' }, { key: 'key1' }, { key: 'key2' }],
        },
      ].slice(0, childIndex + 1),
    };
  };
  var blurredState = makeFakeState(0, false);
  var transitionState = makeFakeState(1, true);
  var focusState = makeFakeState(1, false);
  var transition2State = makeFakeState(0, true);
  var blurred2State = makeFakeState(0, false);
  var childActionHandler = jest.fn();
  var childWillFocusHandler = jest.fn();
  var childDidFocusHandler = jest.fn();
  var childWillBlurHandler = jest.fn();
  var childDidBlurHandler = jest.fn();
  childEventSubscriber('action', childActionHandler);
  childEventSubscriber('willFocus', childWillFocusHandler);
  childEventSubscriber('didFocus', childDidFocusHandler);
  childEventSubscriber('willBlur', childWillBlurHandler);
  childEventSubscriber('didBlur', childDidBlurHandler);
  emitGrandParentAction({
    type: 'action',
    state: transitionState,
    lastState: blurredState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(0);
  emitGrandParentAction({
    type: 'action',
    state: focusState,
    lastState: transitionState,
    action: { type: 'FooAction' },
  });
  expect(childActionHandler.mock.calls.length).toBe(0);
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  emitGrandParentAction({
    type: 'action',
    state: focusState,
    lastState: focusState,
    action: { type: 'TestAction' },
  });
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  expect(childActionHandler.mock.calls.length).toBe(1);
  emitGrandParentAction({
    type: 'action',
    state: transition2State,
    lastState: focusState,
    action: { type: 'CauseWillBlurAction' },
  });
  expect(childWillBlurHandler.mock.calls.length).toBe(1);
  expect(childDidBlurHandler.mock.calls.length).toBe(0);
  expect(childActionHandler.mock.calls.length).toBe(1);
  emitGrandParentAction({
    type: 'action',
    state: blurred2State,
    lastState: transition2State,
    action: { type: 'CauseDidBlurAction' },
  });
  expect(childWillBlurHandler.mock.calls.length).toBe(1);
  expect(childDidBlurHandler.mock.calls.length).toBe(1);
  expect(childActionHandler.mock.calls.length).toBe(1);
});
test('child focus with transition', function() {
  var parentSubscriber = jest.fn();
  var emitParentAction = function emitParentAction(payload) {
    parentSubscriber.mock.calls.forEach(function(subs) {
      if (subs[0] === payload.type) {
        subs[1](payload);
      }
    });
  };
  var subscriptionRemove = function subscriptionRemove() {};
  parentSubscriber.mockReturnValueOnce({ remove: subscriptionRemove });
  var childEventSubscriber = (0, _getChildEventSubscriber2.default)(
    parentSubscriber,
    'key1'
  );
  var randomAction = { type: 'FooAction' };
  var testState = {
    key: 'foo',
    routeName: 'FooRoute',
    routes: [{ key: 'key0' }, { key: 'key1' }],
    index: 0,
    isTransitioning: false,
  };
  var childWillFocusHandler = jest.fn();
  var childDidFocusHandler = jest.fn();
  var childWillBlurHandler = jest.fn();
  var childDidBlurHandler = jest.fn();
  childEventSubscriber('willFocus', childWillFocusHandler);
  childEventSubscriber('didFocus', childDidFocusHandler);
  childEventSubscriber('willBlur', childWillBlurHandler);
  childEventSubscriber('didBlur', childDidBlurHandler);
  emitParentAction({
    type: 'didFocus',
    action: randomAction,
    lastState: testState,
    state: testState,
  });
  emitParentAction({
    type: 'action',
    action: randomAction,
    lastState: testState,
    state: _extends({}, testState, { index: 1, isTransitioning: true }),
  });
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  emitParentAction({
    type: 'action',
    action: randomAction,
    lastState: _extends({}, testState, { index: 1, isTransitioning: true }),
    state: _extends({}, testState, { index: 1, isTransitioning: false }),
  });
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  emitParentAction({
    type: 'action',
    action: randomAction,
    lastState: _extends({}, testState, { index: 1, isTransitioning: false }),
    state: _extends({}, testState, { index: 0, isTransitioning: true }),
  });
  expect(childWillBlurHandler.mock.calls.length).toBe(1);
  emitParentAction({
    type: 'action',
    action: randomAction,
    lastState: _extends({}, testState, { index: 0, isTransitioning: true }),
    state: _extends({}, testState, { index: 0, isTransitioning: false }),
  });
  expect(childDidBlurHandler.mock.calls.length).toBe(1);
});
test('child focus with immediate transition', function() {
  var parentSubscriber = jest.fn();
  var emitParentAction = function emitParentAction(payload) {
    parentSubscriber.mock.calls.forEach(function(subs) {
      if (subs[0] === payload.type) {
        subs[1](payload);
      }
    });
  };
  var subscriptionRemove = function subscriptionRemove() {};
  parentSubscriber.mockReturnValueOnce({ remove: subscriptionRemove });
  var childEventSubscriber = (0, _getChildEventSubscriber2.default)(
    parentSubscriber,
    'key1'
  );
  var randomAction = { type: 'FooAction' };
  var testState = {
    key: 'foo',
    routeName: 'FooRoute',
    routes: [{ key: 'key0' }, { key: 'key1' }],
    index: 0,
    isTransitioning: false,
  };
  var childWillFocusHandler = jest.fn();
  var childDidFocusHandler = jest.fn();
  var childWillBlurHandler = jest.fn();
  var childDidBlurHandler = jest.fn();
  childEventSubscriber('willFocus', childWillFocusHandler);
  childEventSubscriber('didFocus', childDidFocusHandler);
  childEventSubscriber('willBlur', childWillBlurHandler);
  childEventSubscriber('didBlur', childDidBlurHandler);
  emitParentAction({
    type: 'didFocus',
    action: randomAction,
    lastState: testState,
    state: testState,
  });
  emitParentAction({
    type: 'action',
    action: randomAction,
    lastState: testState,
    state: _extends({}, testState, { index: 1 }),
  });
  expect(childWillFocusHandler.mock.calls.length).toBe(1);
  expect(childDidFocusHandler.mock.calls.length).toBe(1);
  emitParentAction({
    type: 'action',
    action: randomAction,
    lastState: _extends({}, testState, { index: 1 }),
    state: _extends({}, testState, { index: 0 }),
  });
  expect(childWillBlurHandler.mock.calls.length).toBe(1);
  expect(childDidBlurHandler.mock.calls.length).toBe(1);
});
