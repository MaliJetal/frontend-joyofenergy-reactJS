/**
 * Function to create mock readings data
 * @param {number} length 
 * @returns {Array} array of readings, each reading contains times and random values.
 */
export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};

/**
 * Function to get readings on daily basis
 * @param {Array} readings
 * @returns {Array} array of readings grouped by day.
 */
export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});
  
  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

/**
 * Function to sort the array as per the time.
 * @param {Array} readings 
 * @returns {Array} sorted readings
 */
export const sortByTime = (readings) => [...readings].sort(
  (readingA, readingB) => readingA.time - readingB.time
);
