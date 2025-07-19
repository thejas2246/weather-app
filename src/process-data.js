import { format } from 'date-fns';
export let StoreData = {
  locationName: '',
  currentForeCast: '',
  dailyForeCast: [],
  hourlyForeCast: [],
};

export function processData(data) {
  StoreData.locationName = data.resolvedAddress;
  StoreData.currentForeCast = data.currentConditions;
  StoreData.dailyForeCast = data.days;
  StoreData.hourlyForeCast = data.days[0].hours;
  formatDailyForeCastDate(StoreData.dailyForeCast);
  formatHourlyForeCastTime(StoreData.hourlyForeCast);
  console.log(StoreData);
}

function formatDailyForeCastDate(dailyForeCast) {
  for (let day of dailyForeCast) {
    const date = day.datetime.split('-');
    day.datetime = format(new Date(date[0], date[1] - 1, date[2]), 'd MMM,eee');
  }
}
