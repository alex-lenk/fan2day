export function timer(config) {
  //config.deadline = config.deadline + new Date().getTimezoneOffset() * 60;

  const $hours = config.hours;
  const $minutes = config.minutes;
  const $seconds = config.seconds;

  let interval = setInterval(() => {
    config.deadline--;

    if (config.deadline <= 0) {
      $hours.text('00');
      $minutes.text('00');
      $seconds.text('00');
      clearInterval(interval);
      return;
    }

    let hours = Math.floor(config.deadline / 60 / 60);
    let minutes = Math.floor(config.deadline / 60) - (hours * 60);
    let seconds = config.deadline % 60;

    $hours.text(hours < 10 ? '0' + hours : hours);
    $minutes.text(minutes < 10 ? '0' + minutes : minutes);
    $seconds.text(seconds < 10 ? '0' + seconds : seconds);

  }, 1000);
}