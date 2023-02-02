export interface TGoogleUserEndpoint {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: TGoogleUserAppMetadata
  user_metadata: TGoogleUserMetadata
  identities: TGoogleUserIdentity[]
  created_at: string
  updated_at: string
}

export interface TGoogleUserAppMetadata {
  provider: string
  providers: string[]
}

export interface TGoogleUserMetadata {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  picture: string
  provider_id: string
  sub: string
}

export interface TGoogleUserIdentity {
  id: string
  user_id: string
  identity_data: TGoogleUserIdentityData
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
}

export interface TGoogleUserIdentityData {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  picture: string
  provider_id: string
  sub: string
}
