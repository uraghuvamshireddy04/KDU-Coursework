import type { Frequency } from "./frequency";
import type { Option } from "./Option";
import type { Room } from "./room";
import type { ServiceType } from "./serviceType";
import type { TimeSlot } from "./timeSlot";

export interface CleanlyType{
    types: ServiceType[],
    frequency: Frequency[],
    options: Option[],
    time: TimeSlot[],
    rooms: Room[],
    default: any
}