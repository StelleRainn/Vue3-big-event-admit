import axios from 'axios'

/**
 * 将网络图片URL转换为File对象
 * @param {string} imageUrl - 图片的完整URL地址
 * @param {string} filename - 文件名（可选，默认为image.jpg）
 * @returns {Promise<File>} 返回File对象的Promise
 */
export const convertOnlineImageToFile = async (imageUrl, filename = 'image.jpg') => {
  try {
    // 1. 使用axios下载图片，设置响应类型为blob
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'blob' // 关键：设置响应类型为二进制数据
    })

    // 2. 获取图片的二进制数据(blob)
    const imageBlob = response.data

    // 3. 从URL中提取文件名（如果没有提供filename参数）
    if (filename === 'image.jpg') {
      const urlParts = imageUrl.split('/')
      const lastPart = urlParts[urlParts.length - 1]
      if (lastPart && lastPart.includes('.')) {
        filename = lastPart
      }
    }

    // 4. 将Blob转换为File对象
    // File构造函数：new File([blob], filename, {type: mimeType})
    const file = new File([imageBlob], filename, {
      type: imageBlob.type || 'image/jpeg' // 设置MIME类型
    })

    return file
  } catch (error) {
    console.error('图片转换失败:', error)
    throw new Error('无法将网络图片转换为File对象')
  }
}
