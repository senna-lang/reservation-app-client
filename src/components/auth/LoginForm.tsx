"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "username is required",
  }),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      const res = await axiosInstance.post("http://127.0.0.1:8000/users", data);
      console.log(res);
      router.push("/room");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log into your account with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Sign In</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
