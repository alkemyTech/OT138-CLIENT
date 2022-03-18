
/**
 * Creates an new array of objects
 * @param {Number} num Number of object in the array
 * @param {Object} obj Object to put in array
 * @returns an new array of objects
 */
export function createArrayOfObjects(num = 1, obj = {}){
  return Array.from({length: num}, (v, i) => {return obj})
 }