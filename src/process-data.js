let StoreData = {
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
  console.log(StoreData);
}
