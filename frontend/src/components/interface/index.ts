export interface IRegisterInput {
    type:string
    placeholder:string
    name:"username" | "email" | "password"
    validation:{
        required?:boolean, 
        minLength?:number, 
        pattern?:RegExp
    }
}

export interface ILoginInput {
    type:string
    placeholder:string
    name:"identifier" | "password"
    validation:{
        required?:boolean, 
        minLength?:number, 
        pattern?:RegExp
    }
}

export interface IErrors {
    error: {
      details?:{
         errors:{
            message:string
         }[]
      },
      message?:string
    }
   
}

export interface ITodo {
    
    id?:string
    title:string
}