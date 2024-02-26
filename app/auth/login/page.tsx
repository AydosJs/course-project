import Button from "@/components/form-elements/Button";
import Input from "@/components/form-elements/Input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-slate-900 dark:text-slate-200 font-semibold text-4xl leading-9 tracking-tight">
          Welcome back!
        </h2>
        <p className="text-center mt-2 text-slate-600 dark:text-slate-500 font-medium text-md leading-9 tracking-tight">
          We suggest using the email address you set at work.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div className="flex flex-col space-y-4">
            <Input name="Email" type="email" id="email" label="Email address" />

            <Input
              name="Password"
              type="password"
              id="password"
              label="Password"
            />
          </div>
          <div className="">
            <Button loading={false}>Login</Button>
          </div>
        </form>

        <div className="mt-4">
          <div className="mb-2 py-3 flex items-center text-sm text-slate-600 dark:text-slate-500 font-medium before:flex-[1_1_0%] before:border-t before:border-slate-600 before:me-6 after:flex-[1_1_0%] after:border-t after:border-slate-600 after:ms-6 dark:before:border-slate-700 dark:after:border-slate-700">
            Or authorize with
          </div>
          <div className="flex flex-row space-x-4">
            <button className="w-1/2 border-2 text-md font-medium bg-slate-100 hover:bg-slate-100/50 text-slate-900 dark:text-white dark:border-slate-500 rounded dark:bg-slate-700 dark:hover:bg-slate-700/50 dark:hover:border-slate-500/50 p-2 flex flex-row items-center justify-center">
              <FcGoogle className="size-4 mr-2" />
              Google
            </button>
            <button className="w-1/2 border-2 text-md font-medium bg-slate-100 hover:bg-slate-100/50 text-slate-900 dark:text-white dark:border-slate-500 rounded dark:bg-slate-700 dark:hover:bg-slate-700/50 dark:hover:border-slate-500/50 p-2 flex flex-row items-center justify-center">
              <FaGithub className="size-4 mr-2" />
              Github
            </button>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-500 mt-4 font-medium text-sm leading-9 tracking-tight">
          Don&apos;t have an account?&nbsp;
          <span className="inline-block text-slate-900 dark:text-sky-500 text-md underline">
            Create now
          </span>
        </p>
      </div>
    </div>
  );
}
