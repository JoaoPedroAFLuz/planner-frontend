export class DateUtils {
  public static toDateTimeLocalInput(dateString: string): string {
    const date = new Date(dateString);

    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * 60 * 1000;

    const utcDate = new Date(date.getTime() - timezoneOffsetInMilliseconds);

    return utcDate.toISOString().slice(0, 16);
  }
}
