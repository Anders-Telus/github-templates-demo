/**
 * @description notes filter is used for View All Historical notes page
 * by default for Home Solution includeSysNotes is true
 * by default for Mobility includeSysNotes is false
 * @param {string} LOB
 * @returns object - {includeSysNotes: true || false}
 */
const createNotesFilter = (LOB) => {
  let notes = {}
  if (LOB === 'mobility') {
    notes = { includeSysNotes: false }
  } else {
    notes = { includeSysNotes: true }
  }
  return notes
}

export default createNotesFilter
