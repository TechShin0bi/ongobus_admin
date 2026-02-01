
export const loginEndpoint = "/auth/login/";
export const refreshEndpoint = "/auth/token/refresh/";
export const logoutEndpoint = "/auth/logout/";
export const buses = "/buses/";
export const agencies = "/agencies/"
export const users = "/users/";
export const agency = "/agencies/";
export const new_agency = "/agencies/new/";
export const agencyUsers = (agencyId: string) => `/agencies/${agencyId}/branches/`;