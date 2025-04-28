import { Provider, type User } from "@prisma/client"
import prisma from "../db/prisma"
import { signJwt } from "../utils/jwt"
import { env } from "../utils/env"

export interface UserCreationData {
  username: string
  email: string
  avatarUrl: string
  providerUserId: string
}

export abstract class AuthProvider {
  protected abstract provider: Provider
  protected abstract getUserData(code: string): Promise<UserCreationData>

  abstract getLoginUrl(): string

  protected async getOrCreateUser(data: UserCreationData) {
    const user = await prisma.user.findFirst({
      where: {
        accounts: {
          some: {
            provider: Provider.discord,
            providerUserId: data.providerUserId,
          },
        },
      },
    })

    if (user) return user
    return await this.createUser(data)
  }

  private async createUser(data: UserCreationData) {
    return await prisma.user.create({
      data: {
        username: data.username,
        avatarUrl: data.avatarUrl,
        email: data.email,
        accounts: {
          create: {
            provider: Provider.discord,
            providerUserId: data.providerUserId,
          },
        },
      },
    })
  }

  abstract login(code: string): Promise<User>

  async getJwtToken(user: User) {
    return await signJwt(
      {
        sub: user.id,
      },
      env.JWT_SECRET,
    )
  }
}
