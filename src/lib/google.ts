import { google } from 'googleapis'
import { prisma } from './prisma'
import dayjs from 'dayjs'

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  })

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at && account.expires_at * 1000,
  })

  if (!account.expires_at) return auth

  const isTokenExpired = dayjs(account.expires_at * 1000).isBefore(new Date())

  if (!isTokenExpired) return auth

  const { credentials } = await auth.refreshAccessToken()

  await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
      expires_at:
        credentials.expiry_date && Math.floor(credentials.expiry_date / 1000),
      id_token: credentials.id_token,
      scope: credentials.scope,
      token_type: credentials.token_type,
    },
  })

  auth.setCredentials({
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token,
    expiry_date: credentials.expiry_date,
  })

  return auth
}
