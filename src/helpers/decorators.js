export const throttle = (func, throttleTime = 200) => {
  let context,
    savedArgs,
    throttling = null;

  return function (...args) {
    if (throttling) return;
    context = this;
    savedArgs = args;

    throttling = setTimeout(() => {
      func.apply(context, savedArgs);
      throttling = null;
    }, throttleTime);
  };
};
