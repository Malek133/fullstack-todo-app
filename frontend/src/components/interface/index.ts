export interface IRegisterInput {
    type:string
    placeholder:string
    name:"userName" | "email" | "password"
    validation:{
        required?:boolean, 
        minLength?:number, 
        pattern?:RegExp
    }
}