const config = {
    AppWriteUrl :String(import.meta.env.VITE_APPWRITE_URL),
    AppWriteProjectId :String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppWriteDatabaseId :String(import.meta.env.VITE_DATABASE_ID),
    AppWriteCollectionID :String(import.meta.env.VITE_COLLECTION_ID)
}

export default config;