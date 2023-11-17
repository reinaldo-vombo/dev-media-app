import * as z from "zod"

export const singnupValidation = z.object({
   name: z.string().min(2, {message: 'Nome muito curto'}),
   username: z.string().min(2, { message: 'Nome muito curto'}),
   email: z.string().email(),
   password: z.string().min(8, { message: 'palavra-passe tem que conter no minimo 8 caracteres'})
 })
 
export const singninValidation = z.object({
   email: z.string().email(),
   password: z.string().min(8, { message: 'palavra-passe tem que conter no minimo 8 caracteres'})
 })
export const postValidation = z.object({
   caption: z.string().min(5).max(2200),
   file: z.custom<File[]>(),
   location: z.string().min(2).max(100),
   tags: z.string()
 })
 