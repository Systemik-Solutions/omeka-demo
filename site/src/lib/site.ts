/** Keep internal pages and assets portable to a subdirectory deployment. */
export function url(path = "/") {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

const configuredSignup = import.meta.env.PUBLIC_SIGNUP_URL?.trim();
export const signupUrl =
  configuredSignup && /^https:\/\//.test(configuredSignup)
    ? configuredSignup
    : "";
export const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || "";
