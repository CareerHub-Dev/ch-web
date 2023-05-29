export enum WorkFormat {
  Remote = "Remote",
  OnSite = "On_site",
  Hybrid = "Hybrid",
}

export const workFormatOptions = [
  { name: "Віддалено", id: WorkFormat.Remote },
  { name: "Офіс", id: WorkFormat.OnSite },
  { name: "Гібридний", id: WorkFormat.Hybrid },
] as { id: string; name: string }[];
