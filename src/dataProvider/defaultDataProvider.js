export default {
  getEvent: () => Promise.resolve({ data: null }),
  getEvents: () => Promise.resolve({ data: null, total: 0 }),
  getManyEvents: () => Promise.resolve({ data: null, total: 0 }),
  createEvent: () => Promise.resolve({ data: null }),
  updateEvent: () => Promise.resolve({ data: null }),
  deleteEvent: () => Promise.resolve({ data: null })
}
