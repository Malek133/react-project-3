import { ILoginInput, 
IRegisterInput } from "../interface";

export const REGISTER_FORM : IRegisterInput [] = [

    {
        type: 'text',
        name: 'username',
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
        type: 'password',
        name: 'password',
        placeholder:'Password',
        validation:{
            required:true,
            minLength:6
        }
    },
    {
        type:"number",
        name: 'phone',
        placeholder:'phone',
        validation:{
            required:true,
            minLength:5
        }
    }
]

export const LOGIN_FORM : ILoginInput [] = [

   
    {
        type: 'text',
        name: 'identifier',
        placeholder:'Email address',
        validation:{
            required:true,
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        }
    },
    {
        type: 'password',
        name: 'password',
        placeholder:'Password',
        validation:{
            required:true,
            minLength:6
        }
    },
    
]