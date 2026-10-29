/** A project may list multiple institutions, separated by commas in Markdown. */
export function getInstitutions(institution: string): string[] {
  return [...new Set(institution.split(",").map((name) => name.trim()).filter(Boolean))];
}
