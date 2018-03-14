/** Created by ChrisWen
 *  Created a unique number.
 */

const getUniqueId = (() => {
  let count = 0;
  return () => {
    const dateId = Date.now() * 1000;
    const id = dateId + (count += 1 % 1000).toString(16);
    return id;
  };
})();

module.exports = getUniqueId;
