"use client";

import { useCallback, useState } from "react";
import "./page.scss";
import InputField from "@/components/ui/Input/InputField";

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState<string>();

  const handleChange = useCallback((val: string) => {
    setOtp(val);
  }, []);

  return (
    <div className="verify-email-container">
      <div className="verify-email-header">Verify Email</div>

      <InputField type="number" inputValue={otp} onChange={handleChange} />
    </div>
  );
};

export default VerifyEmailPage;
