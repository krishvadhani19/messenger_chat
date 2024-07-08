import "./layout.scss";

interface AuthLayoutPropsType {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutPropsType) => {
  return (
    <div className="auth-form-container">
      <div className="auth-form-children">{children}</div>
    </div>
  );
};

export default AuthLayout;
