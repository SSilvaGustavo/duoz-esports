import * as z from 'zod';

export const createAdFormSchema = z.object({
  game:
    z.string({ required_error: "Selecione um jogo" })
      .uuid({ message: "UUID Invalido" }),

  name:
    z.string({ required_error: "Preencha seu nickname" })
      .min(3, { message: "O nickname desse possuir no mínimo 3 caracteres." }),

  yearsPlaying:
    z.string()
      .nonempty("Informe quanto tempo você joga (Não tem problema ser zero :D)")
      .refine((value) => parseInt(value, 10) >= 0, {
        message: "Informe um número maior que zero"
      }),

  weekDays: z.array(
    z.number()
      .gte(0, { message: 'Cada dia da semana deve ser um número inteiro de 0 a 6.' })
      .lte(6, { message: 'Cada dia da semana deve ser um número inteiro de 0 a 6.' })
  )
    .min(1, "Selecione pelo menos um dia para jogar")
    .max(7, "Selecione até 7 dias para jogar"),

  discord: z.string({ required_error: "Preencha seu discord" }).nonempty("Preencha seu discord"),

  hourStart:
    z.string({ required_error: "Informe o horário que voce começa a jogar" }).nonempty("Selecione o horário de inicio"),

  hourEnd:
    z.string({ required_error: "Informe o horário que voce termina de jogar" }).nonempty("Selecione o horário de termino"),
})

export const weekDaysSchema = z.array(z.string()).nonempty().refine((value) => {
  return value.some((day) => day !== 'off');
}, {
  message: 'Selecione pelo menos um dia da semana'
});