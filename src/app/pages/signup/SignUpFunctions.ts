import { toast } from "react-toastify";
import { login } from "../../../api/UserAPI";

export const handleInputChange = (
  event: React.SyntheticEvent,
  setInputField: Function,
  InputField: {
    email: string;
    password: string;
  }
) => {
  let target = event.target as HTMLInputElement;
  setInputField({
    ...InputField,
    [target.name]: target.type === "checkbox" ? target.checked : target.value,
  });
};

export const handleSubmit = async (
  email: string,
  password: string,
  setInputError: React.Dispatch<React.SetStateAction<any>>,
  setSubmitAPIStatus: React.Dispatch<React.SetStateAction<any>>,
  navigate: (path: string) => void
) => {
  setSubmitAPIStatus((prev: any) => ({ ...prev, loading: true }));

  setInputError({});

  const errors: any = {};
  if (!email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    setInputError(errors);
    setSubmitAPIStatus((prev: any) => ({ ...prev, loading: false }));
    return;
  }

  try {
    const res = await login(email, password);

    if (res.statusCode === 200) {
      toast.success(res.message);
      setInputError({});
      setSubmitAPIStatus((prev: any) => ({ ...prev, loading: false }));
      navigate('/dashboard');
    } else {
      toast.error(res.message);
      setSubmitAPIStatus((prev: any) => ({ ...prev, loading: false }));
    }
  } catch (error) {
    toast.error('Login failed');
    setSubmitAPIStatus((prev: any) => ({ ...prev, loading: false }));
  }
};

