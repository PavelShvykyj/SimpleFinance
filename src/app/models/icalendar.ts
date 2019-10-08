
export enum CalendarElementStatus {
    Header, 
    Disabled, 
    Current, 
    Weekend,
    Date 
}

export interface icalendar {
    title : string,
    date? : Date,
    status : CalendarElementStatus
}