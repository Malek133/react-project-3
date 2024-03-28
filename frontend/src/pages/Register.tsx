import { REGISTER_FORM } from "../components/data";
import ErrorMessage from "../components/errors/ErrorMessage";
import Button from "../components/ui/Button";
 import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { regiterSchema } from "../components/validation";
import {axiosInstance} from "../components/config/axios.config";
import toast from "react-hot-toast";
 import { useState } from "react";
import { AxiosError } from "axios";
import { IErrors } from "../components/interface";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string
  email:string
  password:string
  phone:number
  
}

const RegisterPage = () => {
 const [isloading,setIsloading] =useState(false);
const navigat = useNavigate()
const { register,handleSubmit,formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(regiterSchema)
  })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
     
      setIsloading(true)

  try {
    const {status} = await axiosInstance.post("/auth/local/register",data);
     if(status === 200){
      toast.success('Successfully toasted!',{
        duration: 1200,
        position: 'bottom-center',
        style: {
            backgroundColor:"black",
            color:"white",
            width:"fit-content"
        },
        
      })
      setTimeout(() =>{
        navigat('/login')
      },1500)
     }

  } catch (error) {
    const errorObj = error as AxiosError<IErrors>;

    toast.error(`${errorObj.response?.data.error.message}`,{
      position:"bottom-center",
      duration:4000,
    })

  } finally {
    setIsloading(false)
 }
  }


 const renderRegister = REGISTER_FORM.map(({placeholder,
     type,name,validation},idx) => (
        <div key={idx}> <Input  placeholder={placeholder} type={type}
        {...register(name,validation)}/>
        
        {errors[name] && <ErrorMessage 
        msg={errors[name]?.message} />}
        </div>
        ))
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

        {renderRegister}

        <Button isloading={isloading} fullWidth>
          Register
          </Button>

      </form>
    </div>
  );
};

export default RegisterPage;
