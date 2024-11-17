"use client";

import { useForm } from "react-hook-form";
import { SignupSchema, signupValidatorSchema } from "./validator";
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
import { signupRequest } from "@/requests/auth.requests";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupValidatorSchema),
  });
  const signupMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ name, email, password }: SignupSchema) =>
      await signupRequest(name, email, password),
  });

  const onSubmit = async (data: SignupSchema) => {
    return await signupMutation.mutateAsync(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-foreground/10 p-3 rounded-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
