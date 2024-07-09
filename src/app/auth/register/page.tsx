"use client";

import Button from "@/components/ui/Button/Button";
import InputField from "@/components/ui/Input/InputField";
import { RegisterSchema } from "@/server/schemas/RegisterSchema";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";
import { z } from "zod";
import "./page.scss";
import toast from "react-hot-toast";
import { register } from "@/server/actions/register";
import { formSchema } from "@/server/schemas/x";

type RegisterSchemaFormType = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterSchemaFormType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<RegisterSchemaFormType>>();

  const resetFormData = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const validateForm = useCallback(() => {
    try {
      RegisterSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<RegisterSchemaFormType> = {};

        // Adding all the errors to formError state 
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof RegisterSchemaFormType] = err.message;
          }
        });
        setFormErrors(errors);
      }

      return false;
    }
  }, [formData]);

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (formData?.password !== formData?.confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

      const status = await register(formData);

      if (status?.error) {
        toast.error(status?.error);
        return;
      }

      if (status?.success) {
        toast.success(status?.success);
        router.push(`/auth/verify-email?email=${formData?.email}`);
      }
    }
  }, [formData, router, validateForm]);

  const redirectToLoginPage = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  return (
    <div className="register-form-container">
      <div className="register-form-header">Register</div>

      <form className="register-form-input-fields" onSubmit={handleFormSubmit}>
        <div className="flex-space-between gap-2 w-full">
          <InputField
            isRequired
            type="text"
            label="First Name"
            inputValue={formData?.firstName}
            placeholder="First Name"
            errorMessage={formErrors?.firstName}
            autoComplete="text"
            onChange={(val: string) => {
              setFormData((prev) => ({ ...prev, firstName: val }));
            }}
          />

          <InputField
            isRequired
            type="text"
            label="Last Name"
            inputValue={formData?.lastName}
            placeholder="Last Name"
            errorMessage={formErrors?.lastName}
            autoComplete="text"
            onChange={(val: string) => {
              setFormData((prev) => ({ ...prev, lastName: val }));
            }}
          />
        </div>

        <InputField
          label="Email"
          inputValue={formData?.email}
          type="email"
          placeholder="Email"
          isRequired
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
          placeholder="Create password"
          errorMessage={formErrors?.password}
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, password: val }));
          }}
        />

        <InputField
          isRequired
          type="password"
          label="Confirm Password"
          inputValue={formData?.confirmPassword}
          placeholder="Confirm password"
          errorMessage={formErrors?.confirmPassword}
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, confirmPassword: val }));
          }}
        />

        <Button text="Continue" buttonType="submit" width="50%" />
      </form>


      <div className="register-form-register-redirection">
        Already have an account?{" "}
        <span
          className="login-redirection-button"
          onClick={redirectToLoginPage}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
