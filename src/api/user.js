import request from '@/utils/request'

export function getUsers(params) {
  return request.get('/users', { params })
}

export function getUser(params) {
  const { id, ...other } = params
  return request.get(`/users/${id}`, { params: other })
}

export function createUser(params) {
  return request.post('/users', { user: params })
}

export function updateUser(params) {
  const { id, ...other } = params
  return request.patch(`/users/${id}`, { user: other })
}

export function destroyUser(params) {
  const { id, ...other } = params
  return request.delete(`/users/${id}`, { params: other })
}
