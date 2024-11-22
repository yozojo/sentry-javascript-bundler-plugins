try {
  var globalObject =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};

  var stack = new globalObject.Error().stack;

  if (stack) {
    globalObject._sentryDebugIds = globalObject._sentryDebugIds || {};
    globalObject._sentryDebugIds[stack] = "__SENTRY_DEBUG_ID__";
    globalObject._sentryDebugIdIdentifier = "sentry-dbid-__SENTRY_DEBUG_ID__";
  }
} catch (e) {}