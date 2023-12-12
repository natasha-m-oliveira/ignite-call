import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { Address } from '..'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Insira um endereço de e-mail válido.' }),
  streetNumber: z.string(),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  address?: Address | null
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  address,
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')
  const describedAddress = address
    ? `${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}`
    : undefined

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    if (!address) return

    const { name, email, streetNumber, observations } = data

    await api.post(`users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
      address: {
        zipCode: address.zipCode,
        street: address.street,
        streetNumber,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
      },
    })

    onCancelConfirmation()
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">E-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Endereço</Text>
        <TextInput
          placeholder="Endereço da quadra"
          readOnly
          value={describedAddress}
        />
      </label>

      <label>
        <Text size="sm">Número</Text>
        <TextInput placeholder="Número da rua" {...register('streetNumber')} />
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
