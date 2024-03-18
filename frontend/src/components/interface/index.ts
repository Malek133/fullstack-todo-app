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