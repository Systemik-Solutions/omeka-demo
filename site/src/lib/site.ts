export const navigation = [
  { label: "About", path: "/about/" },
  { label: "Gallery", path: "/gallery/" },
  { label: "Features", path: "/features/" },
  { label: "Getting Started", path: "/getting-started/" },
  { label: "Services", path: "/services/" },
  { label: "Developers", path: "/developers/" },
];

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
export const programmeUrl =
  "https://ardc.edu.au/services/ardc-community-data-lab/";
