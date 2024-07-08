"use client";

import InputField from "@/components/ui/Input/InputField";
import "./page.scss";
import Button from "@/components/ui/Button/Button";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/server/schemas/LoginSchema";
import { z } from "zod";
import { login } from "@/server/actions/login";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
    email: "",
    password: "",
  });

  const resetFormData = useCallback(() => {
    setFormData({ email: "", password: "" });
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    const status = await login(formData);

    if (status?.error) {
      toast.error(status?.error);
      resetFormData();

      return;
    }

    if (status?.success) {
      toast.success(status?.success);
    }

    resetFormData();
  }, [formData, resetFormData]);

  const redirectToSignUpPage = useCallback(() => {
    router.push("/auth/register");
  }, [router]);

  return (
    <div className="login-form-container">
      <div className="login-form-header">Login</div>

      <InputField
        label="Email"
        inputValue={formData?.email}
        type="email"
        placeholder="Enter your email"
        isRequired
        autoComplete="email"
        onChange={(val: string) => {
          setFormData((prev) => ({ ...prev, email: val }));
        }}
        onBlur={() => {}}
      />

      <InputField
        label="Password"
        inputValue={formData?.password}
        type="password"
        placeholder="Enter your password"
        isRequired
        onChange={(val: string) => {
          setFormData((prev) => ({ ...prev, password: val }));
        }}
        onBlur={() => {}}
      />

      <Button text="Continue" onClick={handleSubmitButtonClick} width="50%" />

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
