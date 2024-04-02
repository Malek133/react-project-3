
import { useState } from "react";
import { LOGIN_FORM } from "../components/data";
import ErrorMessage from "../components/errors/ErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../components/validation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IErrors } from "../components/interface";
import { axiosInstance } from "../components/config/axios.config";


interface IFormInput {
  identifier:string
  password:string
}

const LoginPage = () => {

  const [isloading,setIsloading] =useState(false);

  const { register, handleSubmit, 
    formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  })

  const renderLogin = LOGIN_FORM.map(({placeholder,
    type,name,validation},idx) => (
       <div key={idx}> <Input  placeholder={placeholder} type={type}
       {...register(name,validation)}/>
       
       {errors[name] && <ErrorMessage 
       msg={errors[name]?.message} />}
       </div>
       ))
       // RENDER //
       const onSubmit: SubmitHandler<IFormInput> = 
  async (data) => {
     
      setIsloading(true)

  try {
    const {status,data:resData} = await 
    axiosInstance.post("/auth/local",data);
    console.log(resData);
     if(status === 200){
      toast.success('Her we go to Home!',{
        duration: 2000,
        position: 'bottom-center',
        style: {
            backgroundColor:"black",
            color:"white",
            width:"fit-content"
        },
      }) 
      localStorage.setItem('loggedIn', JSON.stringify(resData));
      setTimeout(() =>{
        location.replace('/')
      },2000)
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

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* <Input placeholder="Email address" />
        <Input placeholder="Password" /> */}
         {renderLogin}
        <Button isloading={isloading} fullWidth>
          Login
          </Button>
      </form>
    </div>
  );
};

export default LoginPage;
