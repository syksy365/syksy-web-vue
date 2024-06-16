import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

const messageType = ['success', 'warning', 'info', 'error'] as const

const [
    showSuccessMessage,
    showWarningMessage,
    showInfoMessage,
    showErrorMessage,
] = messageType.map((type) => {
    return (message: string) => {
        ElMessage({
            message,
            type,
        })
    }
})

const message = {
    success: showSuccessMessage,
    warning: showWarningMessage,
    info: showInfoMessage,
    error: showErrorMessage,
}

const [
    showSuccessAlert,
    showWarningAlert,
    showInfoAlert,
    showErrorAlert,
] = messageType.map((type) => {
    return ({
        message,
        title,
    }: {
        message: string
        title: string
    }) => {
        return ElMessageBox({
            message,
            title,
            type,
        })
    }
})

const alert = {
    success: showSuccessAlert,
    warning: showWarningAlert,
    info: showInfoAlert,
    error: showErrorAlert,
}

const [
    showSuccessNotification,
    showWarningNotification,
    showInfoNotification,
    showErrorNotification,
] = messageType.map((type) => {
    return (message: string, title: string = '系统提示') => {
        ElNotification({
            message,
            type,
        })
    }
})

const notification = {
    success: showSuccessNotification,
    warning: showWarningNotification,
    info: showInfoNotification,
    error: showErrorNotification,
}

const confirm = ElMessageBox.confirm

const prompt = ElMessageBox.prompt

export {
    message,
    alert,
    notification,
    confirm,
    prompt,
}
