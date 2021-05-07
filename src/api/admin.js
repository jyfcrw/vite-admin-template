import request from '@/utils/request'

export function getAdmins(params) {
  return request.get('/admins', { params })
}

export function getAdmin(params) {
  const { id, ...other } = params
  return request.get(`/admins/${id}`, { params: other })
}

export function createAdmin(params) {
  return request.post('/admins', { admin: params })
}

export function updateAdmin(params) {
  const { id, ...other } = params
  return request.patch(`/admins/${id}`, { admin: other })
}

export function destroyAdmin(params) {
  const { id, ...other } = params
  return request.delete(`/admins/${id}`, { params: other })
}
