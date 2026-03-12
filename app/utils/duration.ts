const getDuration = (startTime: Date, endTime: Date) => {
  let duration: string;

  let hours: number, minutes: number, currSeconds: number;
  const seconds = (new Date(endTime!).getTime() - new Date(startTime).getTime()) / 1000;

  hours = Math.floor(seconds / 3600);
  minutes = Math.floor((seconds % 3600) / 60);
  currSeconds = Math.floor((seconds % 3600) % 60);

  duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}`;

  return duration;
};

export { getDuration };
