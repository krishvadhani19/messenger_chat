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
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const resetFormData = useCallback(() => {
    setFormData({ email: "", password: "" });
  }, []);

  const redirectToSignUpPage = useCallback(() => {
    router.push("/auth/register");
  }, [router]);

  const validateForm = useCallback(() => {
    try {
      LoginSchema.parse(formData);
      setShowErrors(false);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<LoginSchemaFormType> = {};

        // Creating errors 
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
    setShowErrors(true);

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

      <form onSubmit={handleSubmitButtonClick} className="flex-center direction-column gap-2">
        <InputField
          isRequired
          type="email"
          label="Email"
          inputValue={formData?.email}
          placeholder="Enter your email"
          showError={showErrors}
          errorMessage={formErrors?.email}
          autoComplete="email"
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, email: val }));
          }}
        />

        <InputField
          isRequired
          type="password"
          label="Password"
          inputValue={formData?.password}

          showError={showErrors}
          errorMessage={formErrors?.password}

          placeholder="Enter your password"
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, password: val }));
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
