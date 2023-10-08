import { expect, test } from 'vitest'
import { getAuthToken } from "@utils/services/auth-token-service"

test('get Auth Token', () => {
    expect(getAuthToken()).toMatch(/ghp_[a-zA-Z0-9]{36}/)
})