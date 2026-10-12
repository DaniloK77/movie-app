import { useEffect } from 'react'

const APP_NAME = 'Movie App'

export function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · ${APP_NAME}` : APP_NAME
    }, [title])
}
