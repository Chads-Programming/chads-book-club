import { Provider, User } from "@prisma/client"
import { AuthProvider, UserCreationData } from "../types/auth-provider"
import { env } from "../utils/env"

interface DiscordUserData {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  flags: number
  banner: string
  accent_color: any
  global_name: string
  avatar_decoration_data: {
    asset: string
    sku_id: string
    expires_at: any
  }
  collectibles: any
  banner_color: any
  clan: {
    identity_guild_id: string
    identity_enabled: boolean
    tag: string
    badge: string
  }
  primary_guild: {
    identity_guild_id: string
    identity_enabled: boolean
    tag: string
    badge: string
  }
  mfa_enabled: boolean
  locale: string
  premium_type: number
  email: string
  verified: boolean
}

export class DiscordProvider extends AuthProvider {
  provider = Provider.discord

  protected async getUserData(code: string): Promise<UserCreationData> {
    const data = await getDiscordUserData(code)
    if (!data) throw new Error("No data provided")

    return {
      username: data.username,
      email: data.email,
      avatarUrl: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
      providerUserId: data.id,
    }
  }

  getLoginUrl(): string {
    const url = new URL("https://discord.com/oauth2/authorize")
    
    url.searchParams.set("scope", "email identify")
    url.searchParams.set("response_type", "code")
    url.searchParams.set("client_id", env.DISCORD_CLIENT_ID)
    url.searchParams.set("redirect_uri", env.DISCORD_REDIRECT_URI)

    const loginUrl = url.toString()

    return loginUrl
  }

  async login(code: string): Promise<User> {
    const data = await this.getUserData(code)
    return await this.getOrCreateUser(data)
  }
}

interface DiscordTokenResponse {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

const getDiscordToken = async (code: string) => {
  const response = await fetch("https://discord.com/api/v10/oauth2/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      code: code,
      redirect_uri: env.DISCORD_REDIRECT_URI,
    }),
  })
  const token: DiscordTokenResponse = await response.json()
  return token
}

const getDiscordUserData = async (code: string) => {
  try {
    const token = await getDiscordToken(code)

    const userData = await fetch("https://discord.com/api/v9/users/@me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token.access_token}` },
    })

    const data: DiscordUserData = await userData.json()
    return data
  } catch (error) {
    return null
  }
}
