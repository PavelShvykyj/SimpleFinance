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

export interface IAppOptions {
    AllowNewAccounts : boolean 
}

export interface IAction {
    сategory : actionCategory,
    desckription : string,
    summ : number,
    actionDate : number

}