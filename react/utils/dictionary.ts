export const dictionaryStatus: { [key: string]: DictionaryType } = {
  '1': {
    startDate: new Date().toISOString(),
    endDate: '2099-01-01T00:00',
  },
  '2': {
    startDate: '2022-01-01T00:00',
    endDate: new Date().toISOString(),
  },
}

export const today = new Date(new Date().setHours(0, 0, 0, 0))

const todayUTC = today.valueOf()
const oneDayAgo = 86400000

export const yesterday = new Date(todayUTC - oneDayAgo)

function getMonday(d: Date) {
  d = new Date(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 0)

  return new Date(new Date(d.setDate(diff)).setHours(0, 0, 0, 0))
}

const thisWeek = getMonday(new Date())

export const dictionaryDate: { [key: string]: DictionaryType } = {
  '1': {
    startDate: today.toISOString(),
    endDate: new Date().toISOString(),
  },
  '2': {
    startDate: yesterday.toISOString(),
    endDate: today.toISOString(),
  },
  '3': {
    startDate: thisWeek.toISOString(),
    endDate: new Date().toISOString(),
  },
  '4': {
    startDate: new Date(thisWeek.valueOf() - oneDayAgo * 7).toISOString(),
    endDate: thisWeek.toISOString(),
  },
  '5': {
    startDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
      0,
      0,
      0,
      0
    ).toISOString(),
    endDate: new Date().toISOString(),
  },
  '6': {
    startDate: new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
      0,
      0,
      0,
      0
    ).toISOString(),
    endDate: new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
      0,
      0,
      0,
      0
    ).toISOString(),
  },
  '7': {
    startDate: new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0).toISOString(),
    endDate: new Date().toISOString(),
  },
  '8': {
    startDate: new Date(
      today.getFullYear() - 1,
      0,
      1,
      0,
      0,
      0,
      0
    ).toISOString(),
    endDate: new Date(
      today.getFullYear() - 1,
      11,
      31,
      0,
      0,
      0,
      0
    ).toISOString(),
  },
  '9': {
    startDate: '',
    endDate: '',
  },
}
