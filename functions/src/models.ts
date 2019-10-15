export enum actionCategory {
    sport,
    eat,
    necessary,
    unnecessary,
    pocket,
    chemistry,
    cat,
    clothes,
    education
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