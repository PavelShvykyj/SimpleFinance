export enum actionCategory {
    Спорт,
    Еда,
    Необходимо,
    Развлечения,
    Накарманные,
    Бытовая,
    Питомец,
    Одежда,
    Образование
}

export interface iaction {
    category : actionCategory,
    desckription : string,
    summ : number,
    actionDate : number
    id? : string
}