const getAuthToken = () => {
    // Get the GitHub personal access token from the environment variables.
    const authToken = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
    if (!authToken) {
        throw new Error('[ VITE_GITHUB_PERSONAL_ACCESS_TOKEN ] environment variable is not set.')
    }

    return authToken
}

export { getAuthToken }