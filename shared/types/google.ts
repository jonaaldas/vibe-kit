// OAuth Request Parameters
export interface GoogleOAuthParams {
  client_id: string;
  redirect_uri: string;
  response_type: 'code' | 'token';
  scope: string;
  access_type?: 'online' | 'offline';
  state?: string;
  prompt?: 'none' | 'consent' | 'select_account';
  login_hint?: string;
  include_granted_scopes?: boolean;
}

// OAuth Token Response
export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
  scope: string;
  refresh_token?: string;
  id_token?: string;
}

// User Info Response
export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

// OAuth Error Response
export interface GoogleOAuthError {
  error: string;
  error_description?: string;
  error_uri?: string;
}
