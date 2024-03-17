import { IRegisterInput } from "../interface";

export const REGISTER_FORM : IRegisterInput [] = [

    {
        type: 'text',
        name: 'userName',
        placeholder:'userName',
        validation:{
            required:true,
            minLength:5
        }
    },
    {
        type: 'text',
        name: 'email',
        placeholder:'Email address',
        validation:{
            required:true,
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        }
    },
    {
        type: 'text',
        name: 'password',
        placeholder:'Password',
        validation:{
            required:true,
            minLength:6
        }
    },
]