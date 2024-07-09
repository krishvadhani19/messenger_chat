"use client";

import InputField from "@/components/ui/Input/InputField";
import "./page.scss";
import Button from "@/components/ui/Button/Button";
import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/server/schemas/LoginSchema";
import { z } from "zod";
import { login } from "@/server/actions/login";
import toast from "react-hot-toast";

type LoginSchemaFormType = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginSchemaFormType>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginSchemaFormType>>({});

  const resetFormData = useCallback(() => {
    setFormData({ email: "", password: "" });
  }, []);

  const redirectToSignUpPage = useCallback(() => {
    router.push("/auth/register");
  }, [router]);

  const handleFormDataChange = useCallback((val: string, field: keyof LoginSchemaFormType) => {
    setFormData((prev) => { return { ...prev, [field]: val } });
  }, []);

  const validateForm = useCallback(() => {
    try {
      LoginSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<LoginSchemaFormType> = {};

        // Adding all the errors to formError state 
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof LoginSchemaFormType] = err.message;
          }
        });

        setFormErrors(errors);
      }

      return false;
    }
  }, [formData]);

  const handleSubmitButtonClick = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const status = await login(formData);

      if (status?.error) {
        toast.error(status?.error);
      }

      if (status?.success) {
        toast.success(status?.success);
        router.push("/home")
      }

      resetFormData();
    }
  }, [formData, resetFormData, router, validateForm]);

  return (
    <div className="login-form-container">
      <div className="login-form-header">Login</div>

      <form className="login-form-input-fields" onSubmit={handleSubmitButtonClick}>
        <InputField
          isRequired
          type="email"
          label="Email"
          inputValue={formData?.email}
          placeholder="Enter your email"
          errorMessage={formErrors?.email}
          autoComplete="email"
          onChange={(val: string) => {
            handleFormDataChange(val, 'email');
          }}
        />

        <InputField
          isRequired
          type="password"
          label="Password"
          inputValue={formData?.password}
          errorMessage={formErrors?.password}
          placeholder="Enter your password"
          onChange={(val: string) => {
            handleFormDataChange(val, 'password');
          }}
        />

        <Button text="Continue" buttonType="submit" width="50%" />
      </form>


      <div className="login-form-signup-redirection">
        Don&apos;t have an account?{" "}
        <span
          className="signup-redirection-button"
          onClick={redirectToSignUpPage}
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
