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

export interface iaction {
    сategory : actionCategory,
    desckription : string,
    summ : number,
    actionDate : number

}