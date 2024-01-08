// module.exports = (theFunc) => (req, res, next) => {
//   Promise.resolve(theFunc(req, res, next)).catch(next);
// };

// The above and below code is the same

module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // err => next(err) same as writing next
  };
};
