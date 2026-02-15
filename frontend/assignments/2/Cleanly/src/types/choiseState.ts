interface Room {
    name: string;
    count: number;
}
export interface ChoiceState {
    serviceType: string;
    frequency: string;
    rooms: Room[]; 
    extras: string[]; 
    requirements: string;
    hours: number;
    date: string;
    startTime: string;
}

