import dayjs, {ManipulateType} from "dayjs";

class TimeHelper {
    public parseConfigString(string: string): {
        value: number,
        unit: ManipulateType
    } {
        const [value, unit] = string.split(" ")
        return {value: parseInt(value), unit: unit as ManipulateType}
    }

    public subtractByParams(value: number, unit: ManipulateType): Date {
        return dayjs().subtract(value, unit).toDate()
    }
}

export const timeHelper = new TimeHelper()