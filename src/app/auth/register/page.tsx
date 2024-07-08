"use client";

import Button from "@/components/ui/Button/Button";
import InputField from "@/components/ui/Input/InputField";
import { RegisterSchema } from "@/server/schemas/RegisterSchema";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { z } from "zod";
import "./page.scss";
import toast from "react-hot-toast";
import { register } from "@/server/actions/register";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<z.infer<typeof RegisterSchema>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetFormData = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    if (formData?.password !== formData?.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      resetFormData();
      return;
    }

    const status = await register(formData);

    if (status?.error) {
      toast.error(status?.error);
      // resetFormData();

      return;
    }

    if (status?.success) {
      toast.success(status?.success);
    }

    router.push(`/auth/verify-email?email=${formData?.email}`);

    // resetFormData();
  }, [formData, resetFormData, router]);

  const redirectToLoginPage = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  return (
    <div className="register-form-container">
      <div className="register-form-header">Register</div>

      <div className="flex-space-between gap-2">
        <InputField
          label="First Name"
          inputValue={formData?.firstName}
          type="text"
          placeholder="First Name"
          isRequired
          autoComplete="email"
          onChange={(val: string) => {
            setFormData((prev) => ({ ...prev, firstName: val }));
          }}
        />

        <InputField
          label="Last Name"
          inputValue={formData?.lastName}
          type="text"
          placeholder="Last Name"
          isRequired
          autoComplete="email"
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
        autoComplete="email"
        onChange={(val: string) => {
          setFormData((prev) => ({ ...prev, email: val }));
        }}
      />

      <InputField
        label="Password"
        inputValue={formData?.password}
        type="password"
        placeholder="Create password"
        isRequired
        onChange={(val: string) => {
          setFormData((prev) => ({ ...prev, password: val }));
        }}
      />

      <InputField
        label="Confirm Password"
        inputValue={formData?.confirmPassword}
        type="password"
        placeholder="Confirm password"
        isRequired
        onChange={(val: string) => {
          setFormData((prev) => ({ ...prev, confirmPassword: val }));
        }}
      />

      <Button text="Continue" onClick={handleSubmitButtonClick} width="50%" />

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
