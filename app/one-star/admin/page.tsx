import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // This automatically sends the user to the login page
  redirect("/one-star/admin/login");
  
  // Next.js requires a return statement even if it's never reached
  return null;
}