import dayjs from 'dayjs'

// this method is deprecated, please use $d instead
export function formatTime(time, options='lll') {
  if (!!time) {
    return dayjs(time).format(options)
  }
}