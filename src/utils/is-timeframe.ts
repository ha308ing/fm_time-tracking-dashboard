import { TTimeframeType } from "../hooks";

const timeframeTypes = ["daily", "weekly", "monthly"] as const;

export function isTimeframeType(
    timeframeType: string,
): timeframeType is TTimeframeType {
    return timeframeTypes.includes(timeframeType as TTimeframeType);
}
