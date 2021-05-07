import request from '@/utils/request'

export function login({email, password}) {
  return request.post('/session', {
    email,
    password
  })
}

export function logout() {
  return request.delete('/session', {
    withRefreshToken: true
  })
}

export function refresh() {
  return request.put('/session', {
    withRefreshToken: true
  })
}

export function getProfile() {
  return request.get('/profile')
}
