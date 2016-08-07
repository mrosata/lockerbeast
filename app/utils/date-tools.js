export default function dateTools() {
  return true;
}

// This is useful in models to have a centralized default date function.
export function getDefaultDate () {
  return moment.utc().unix();
}

export function getDateFromNow(howFarFromNow) {
  return moment.utc().add(howFarFromNow).unix();
}
