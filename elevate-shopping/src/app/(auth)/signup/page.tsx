import { AuthForm } from "@/features/auth/components/auth-form";
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";
export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
