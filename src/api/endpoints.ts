export const ocr = "/ocr"

export const me = "/me"
export const refresh = "/auth/refresh"

export const vcf = (nameCardId:number)=>`/vcf/${nameCardId}`
export const contacts = "/contacts"
export const contact = (id: number) => `/contacts/${id}`

export const registration = "/registration"
export const acceptInvitation = "/accept_invitation"

export const invitations = "/invitations"
export const invite = "/invite"

export const roles = "/roles"

export const auth = {
    login: "/auth/login",
    logout: "/auth/logout",
}

