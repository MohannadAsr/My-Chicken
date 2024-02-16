export class countDownDto {
  day = 0 as number;
  hour = 0 as number;
  minute = 0 as number;
  second = 0 as number;
}

export const useCountDown = () => {
  const counter = (
    currentDate: string,
    allowNegative: boolean = false
  ): countDownDto => {
    // return zeros if the currentDate was null
    if (!currentDate)
      return { day: 0, hour: 0, minute: 0, second: 0 } as countDownDto;
    const targetDate = new Date(currentDate).getTime();
    const nowDate = new Date().getTime();
    let gap = targetDate - nowDate;

    // Time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Determine the sign of the gap
    const sign = Math.sign(gap);

    // Ensure gap is always positive for calculations
    gap = Math.abs(gap);

    if (gap < 0 && !allowNegative) {
      return { day: 0, hour: 0, minute: 0, second: 0 } as countDownDto;
    } else {
      return {
        day: sign * Math.floor(gap / day),
        hour: sign * Math.floor((gap % day) / hour),
        minute: sign * Math.floor((gap % hour) / minute),
        second: sign * Math.floor((gap % minute) / second),
      } as countDownDto;
    }
  };
  return { counter };
};
