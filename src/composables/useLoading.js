import { ref } from 'vue'
import { ElLoading } from 'element-plus';

export default function useLoading (name, options={}) {
  const loadingTarget = ref(null)
  const loading = ref(false)

  const wrapLoading = async (callback) => {
    let loadingInstance 

    if (loadingTarget.value) {
      loadingInstance = ElLoading.service({
        target: loadingTarget.value,
        text: '数据加载中',
        ...options
      })
    }

    loading.value = true
    await callback()
    loading.value = false
    
    if (loadingInstance) {
      loadingInstance.close()
    }
  }
  
  return {
    [ name ? `${name}Loading`: 'loading' ]: loading,
    [ name ? `${name}LoadingTarget` : 'loadingTarget' ]: loadingTarget,
    [ name ? `${name}WrapLoading` : 'wrapLoading' ]: wrapLoading,
  }
}