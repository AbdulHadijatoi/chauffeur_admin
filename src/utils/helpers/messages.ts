import { toast } from "vue3-toastify";

export { successMessage, errorMessage, warningMessage, infoMessage };

const successMessage = (message: string) => {
    toast(message, {
      "theme": "light",
      "type": "success",
      // "autoClose": false,
      "dangerouslyHTMLString": true
    })
}
  
const errorMessage = (message: any) => {
    toast(message, {
      "theme": "light",
      "type": "error",
      // "autoClose": false,
      "dangerouslyHTMLString": true
    })
}
  
const warningMessage = (message: string) => {
    toast(message, {
      "theme": "light",
      "type": "warning",
      // "autoClose": false,
      "dangerouslyHTMLString": true
    })
}
  
const infoMessage = (message: string) => {
    toast(message, {
      "theme": "light",
      "type": "info",
      // "autoClose": false,
      "dangerouslyHTMLString": true
    })
}