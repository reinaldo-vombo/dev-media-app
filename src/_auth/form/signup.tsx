import * as z from "zod"
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { singnupValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { logo } from "@/assets"
import { Loader } from "@/components/shared/loader"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queryAndMutation"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
   const { toast } = useToast()
   const { checkAuthUser } = useUserContext()
   const navigate = useNavigate()

   const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()

   const { mutateAsync: signInaccount, } = useSignInAccount()

   const form = useForm<z.infer<typeof singnupValidation>>({
      resolver: zodResolver(singnupValidation),
      defaultValues: {
         username: "",
         name: '',
         email: '',
         password: ''

      },
   })
   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof singnupValidation>) {

      const newUser = await createUserAccount(values)

      if (!newUser) {
         return toast({ title: 'Falha ao registrar. Porfavor tente de novo' })
      }

      const session = await signInaccount({
         email: values.email,
         password: values.password
      })

      if (!session) {
         return toast({ title: 'Falha ao registrar. Porfavor tente de novo' })
      }
      const isLoggedIn = await checkAuthUser()

      if (isLoggedIn) {
         form.reset()

         navigate('/')
      } else {
         return toast({ title: 'Falha ao registrar. Porfavor tente de novo' })
      }

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sign-in-form form">
            <div className="sm:w-[420px] flex-center flex-col">
               <img src={logo} className="w-full" width={200} height={200} alt="logo" />

               <h2 className="h3-bold md:h2-bold pt-5 sm:pt-4">Criar uma conta nova</h2>

            </div>
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Nome de Utilizadore</FormLabel>
                     <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input type="email" className="shad-input" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Palavra-passe</FormLabel>
                     <FormControl>
                        <Input type="password" className="shad-input" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="shad-button_primary w-full">
               {isCreatingAccount ? (
                  <div className="flex-center gap-2">
                     <Loader />  Carregando...
                  </div>
               ) : 'Registrar'}
            </Button>
         </form>
      </Form>
   )
}


