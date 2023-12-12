import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'
import {
  AddressForm,
  AddressPreview,
  FormError,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
} from './styles'
import { ArrowRight, MapPin, X } from 'phosphor-react'
import { Button, Text, TextInput } from '@ignite-ui/react'
import * as Popover from '@radix-ui/react-popover'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'

const addressFormSchema = z.object({
  zipCode: z
    .string()
    .refine((value) => /^\d{5}-?\d{3}$/.test(value), {
      message: 'CEP inválido.',
    })
    .transform((value) => value.replace(/\D/g, '')),
})

type AddressFormData = z.infer<typeof addressFormSchema>

export interface Address {
  zipCode: string
  street: string
  neighborhood: string
  city: string
  state: string
}

export function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  const [address, setAddress] = useState<Address | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
  })

  const describedAddress = address
    ? `${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}`
    : 'Endereço da quadra - São Paulo - SP'

  async function handleAddressLookup(data: AddressFormData) {
    try {
      const response = await api.get(
        `https://viacep.com.br/ws/${data.zipCode}/json/`,
      )

      if (response.data?.erro) {
        setError('zipCode', { message: 'CEP não encontrado.' })
        setAddress(null)
      }

      setAddress({
        zipCode: String(response.data.cep),
        street: String(response.data.logradouro),
        neighborhood: String(response.data.bairro),
        city: String(response.data.localidade),
        state: String(response.data.uf),
      })
    } catch {
      setError('zipCode', { message: 'CEP não encontrado.' })
    }
  }

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime)
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        address={address}
        onCancelConfirmation={handleClearSelectedDateTime}
      />
    )

  return (
    <>
      <Popover.Root>
        <AddressPreview>
          <MapPin />
          <Text title={describedAddress}>{describedAddress}</Text>
          <Popover.Trigger asChild>
            <button aria-label="Update address">
              <Text>alterar</Text>
            </button>
          </Popover.Trigger>
        </AddressPreview>

        <Popover.Portal>
          <Popover.Content asChild sideOffset={5}>
            <PopoverContent>
              <AddressForm onSubmit={handleSubmit(handleAddressLookup)}>
                <label>
                  <Text size="sm">CEP</Text>
                  <div>
                    <TextInput
                      placeholder="CEP da quadra"
                      {...register('zipCode')}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      disabled={isSubmitting}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                </label>
              </AddressForm>
              {errors.zipCode && (
                <FormError>{errors.zipCode.message}</FormError>
              )}
              <PopoverClose aria-label="Close">
                <X />
              </PopoverClose>
              <PopoverArrow />
            </PopoverContent>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <CalendarStep address={address} onSelectDateTime={setSelectedDateTime} />
    </>
  )
}
