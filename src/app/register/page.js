import RegisterForm from "../../components/register-form";
 
export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-16">
        <RegisterForm />
      </div>
    </main>
  );
}