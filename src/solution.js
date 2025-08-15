function solution(D) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Sum values by weekday
  const sums = {};
  for (const [dateStr, value] of Object.entries(D)) {
    const dateObj = new Date(dateStr);
    const weekday = weekdays[(dateObj.getDay() + 6) % 7]; // Mon=0
    sums[weekday] = (sums[weekday] || 0) + value;
  }

  // Fill array with null for missing days
  const fullWeek = weekdays.map(w => (sums.hasOwnProperty(w) ? sums[w] : null));

  // Custom rounding that works symmetrically for negatives
  const roundSym = (num) => {
    return num >= 0 ? Math.round(num) : -Math.round(-num);
  };

  // Interpolation without wrap
  for (let i = 0; i < weekdays.length; i++) {
    if (fullWeek[i] === null) continue;

    // find next known value going forward
    let j = i + 1;
    while (j < weekdays.length && fullWeek[j] === null) {
      j++;
    }
    if (j >= weekdays.length) break;

    const startVal = fullWeek[i];
    const endVal = fullWeek[j];
    const gap = j - i - 1;

    if (gap > 0) {
      const step = (endVal - startVal) / (gap + 1);
      for (let m = 1; m <= gap; m++) {
        fullWeek[i + m] = roundSym(startVal + step * m);
      }
    }
  }

  // Return object
  const result = {};
  weekdays.forEach((w, idx) => result[w] = fullWeek[idx]);
  return result;
}

module.exports = solution;
