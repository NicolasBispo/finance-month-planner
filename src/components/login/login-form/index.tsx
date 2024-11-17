"use client";

import { useForm } from "react-hook-form";
import { LoginSchema, loginValidatorSchema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/requests/auth.requests";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginValidatorSchema),
  });
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginSchema) =>
      await loginRequest(email, password),
  });

  const onSubmit = async (data: LoginSchema) => {
    return await loginMutation.mutateAsync(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-foreground/10 p-3 rounded-lg"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button variant={"outline"} type="submit">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
