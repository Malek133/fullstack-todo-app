import { REGISTER_FORM } from "../components/data";
import ErrorMessage from "../components/errors/ErrorMessage";
import Button from "../components/ui/Button";
 import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { regiterSchema } from "../components/validation";

interface IFormInput {
  userName: string
  email:string
  password:string
}

const RegisterPage = () => {

  const { register, handleSubmit,
    formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(regiterSchema)
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
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
        <Button fullWidth>Register</Button>

      </form>
    </div>
  );
};

export default RegisterPage;
