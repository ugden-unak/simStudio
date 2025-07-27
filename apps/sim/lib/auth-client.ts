export function useSession() {
  return { data: { user: { id: 'local-user', email: 'local@example.com', name: 'Local User' } }, isPending: false }
}

export function useActiveOrganization() {
  return { data: { id: 'default-org', name: 'Default Org' } }
}

export const signIn = async () => ({ data: null })
export const signUp = async () => ({ data: null })
export const signOut = async () => ({})

export const client = {}
