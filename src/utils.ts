// Function to dynamically load styles
export const loadStyles = async (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const link = document.createElement("link")
    link.href = url
    link.rel = "stylesheet"
    link.onload = () => {
      resolve()
    }
    link.onerror = (error) => {
      reject(error)
    }
    document.head.appendChild(link)
  })
}
