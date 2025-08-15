const solution = require('../src/solution');

test('Example 1: simple sum by weekday', () => {
  const D = {
    '2020-01-01': 4,  // Wed
    '2020-01-02': 4,  // Thu
    '2020-01-03': 6,  // Fri
    '2020-01-04': 8,  // Sat
    '2020-01-05': 2,  // Sun
    '2020-01-06': -6, // Mon
    '2020-01-07': 2,  // Tue
    '2020-01-08': -2  // Wed
  };
  const out = solution(D);
  expect(out).toEqual({
    Mon: -6,
    Tue: 2,
    Wed: 2,  // 4 + (-2)
    Thu: 4,
    Fri: 6,
    Sat: 8,
    Sun: 2,
  });
});

test('Example 2: fill missing Thu & Fri via interpolation', () => {
  const D = {
    '2020-01-01': 6,  // Wed
    '2020-01-04': 12, // Sat
    '2020-01-05': 14, // Sun
    '2020-01-06': 2,  // Mon
    '2020-01-07': 4,  // Tue
    // Thu, Fri missing
  };
  const out = solution(D);
  expect(out).toEqual({
    Mon: 2,
    Tue: 4,
    Wed: 6,
    Thu: 8,  // between Wed=6 and Sat=12
    Fri: 10, // between Wed=6 and Sat=12
    Sat: 12,
    Sun: 14,
  });
});

// Extra: negative / zero handling
test('Handles negatives and zeros; rounds interpolation', () => {
  const D = {
    '2020-01-06': 0,   // Mon
    '2020-01-07': 0,   // Tue
    '2020-01-08': 0,   // Wed
    '2020-01-12': -5,  // Sun
  };
  const out = solution(D);
  // Missing Thu, Fri, Sat between Wed=0 and Sun=-5 -> equal steps: -1, -3, -4 (rounded)
  expect(out).toEqual({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: -1,
    Fri: -3,
    Sat: -4,
    Sun: -5,
  });
});
