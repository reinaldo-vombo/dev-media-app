
import * as z from "zod"
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { singninValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { Loader } from "@/components/shared/loader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { logo } from "@/assets"
import { useSignInAccount } from "@/lib/react-query/queryAndMutation"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
   const { toast } = useToast()
   const { isLoading: isUserLoading, checkAuthUser } = useUserContext()

   const navigate = useNavigate()


   const { mutateAsync: signInaccount, isPending: isLoading } = useSignInAccount()
   const form = useForm<z.infer<typeof singninValidation>>({
      resolver: zodResolver(singninValidation),
      defaultValues: {
         email: '',
         password: ''

      },
   })
   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof singninValidation>) {
      const session = await signInaccount({
         email: values.email,
         password: values.password
      })

      if (!session) {

         toast({ title: 'Falha ao registrar. Porfavor tente de novo' })
         form.reset()

         return
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
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sign-up-form form">
            <div className="sm:w-420 flex-center flex-col">
               <img src={logo} className="w-full" width={200} height={200} alt="logo" />
               <h2 className="h3-bold md:h2-bold pt-5 sm:pt-4">Iniciar seção</h2>
            </div>
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
            <Button type="submit" className="shad-button_primary w-full" disabled={isLoading}>
               {isUserLoading || isLoading ? (
                  <div className="flex-center gap-2">
                     <Loader />  Carregando...
                  </div>
               ) : 'Entrar'}
            </Button>
         </form>
      </Form>
   )
}


