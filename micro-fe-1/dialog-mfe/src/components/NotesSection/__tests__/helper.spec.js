import createNotesFilter from '../helper'

describe('Note Section Helper functions', () => {
  it('should call createNotesFilter for Mobility', () => {
    const output = createNotesFilter('mobility')
    expect(output).toEqual(
      expect.objectContaining({ includeSysNotes: false })
    )
  })

  it('should call createNotesFilter for Home Solution', () => {
    const output = createNotesFilter('ffh')
    expect(output).toEqual(
      expect.objectContaining({ includeSysNotes: true })
    )
  })
})
