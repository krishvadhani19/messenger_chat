"use client";

import { useCallback, useState } from "react";
import "./page.scss";
import InputField from "@/components/ui/Input/InputField";
import Button from "@/components/ui/Button/Button";
import { verifyEmail } from "@/server/actions/verify-email";
import { useSearchParams } from "next/navigation";

const VerifyEmailPage = () => {
  const [formData, setFormData] = useState<{ otp: string }>({ otp: "" });
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const handleChange = useCallback((val: string) => {
    setFormData({ otp: val });
  }, []);

  const submitOTP = useCallback(async () => {
    await verifyEmail(formData, email as string);
  }, [email, formData]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-header">Verify Email</div>

      <InputField
        type="number"
        inputValue={formData?.otp}
        onChange={handleChange}
      />

      <Button text="Confirm" onClick={submitOTP} />
    </div>
  );
};

export default VerifyEmailPage;
