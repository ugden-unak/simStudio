export interface Session {
  user: { id: string; email: string; name: string }
}

export async function getSession(): Promise<Session> {
  return {
    user: {
      id: 'local-user',
      email: 'local@example.com',
      name: 'Local User',
    },
  }
}

export async function signIn() {
  return { data: null }
}

export async function signUp() {
  return { data: null }
}
