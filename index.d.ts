export interface DeskcrewTicketSource {
  /** Collection slug whose new documents become tickets. */
  slug: string
  /** Field names (dot paths allowed) holding the sender's name, email and message. */
  fields: { name?: string; email: string; message: string }
}

export interface DeskcrewPluginOptions {
  /** Your DeskCrew public widget key, e.g. "pub_xxxxxxxx". Required. */
  widgetKey: string
  /** The site your widget runs on, e.g. "https://www.example.com". Used as the ticket origin. */
  siteUrl: string
  /** Collections to forward. */
  ticketSources: DeskcrewTicketSource[]
  /** Only change this if DeskCrew tells you to. */
  appUrl?: string
}

/** Returns a plugin that adds an afterChange hook to each listed collection. */
export function deskcrewPlugin(
  options: DeskcrewPluginOptions,
): <T extends { collections?: any[] }>(config: T) => T
export default deskcrewPlugin
