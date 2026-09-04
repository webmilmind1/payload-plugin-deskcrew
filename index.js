'use strict'

const { mapEntryToTicket, submitTicket, validKey } = require('./lib/ticket.js')

/**
 * Plugin for a Payload config:
 *
 *   import { deskcrewPlugin } from 'payload-plugin-deskcrew'
 *   export default buildConfig({
 *     plugins: [
 *       deskcrewPlugin({
 *         widgetKey: process.env.DESKCREW_WIDGET_KEY,   // pub_... from your DeskCrew dashboard
 *         siteUrl: 'https://www.example.com',           // the site your widget runs on
 *         ticketSources: [
 *           { slug: 'contact-submissions', fields: { name: 'name', email: 'email', message: 'message' } },
 *         ],
 *       }),
 *     ],
 *   })
 *
 * Every document created in a listed collection becomes a DeskCrew ticket with the mapped
 * fields (dot paths allowed). Documents without an email or a message are skipped, and
 * sending never blocks the create. The plugin adds one afterChange hook per collection
 * and changes nothing else in your config.
 */
function deskcrewPlugin(options) {
  const opts = options || {}
  const sources = Array.isArray(opts.ticketSources) ? opts.ticketSources : []
  const active = validKey(opts.widgetKey) && sources.length > 0
  const bySlug = new Map(sources.map((s) => [s.slug, s.fields]))

  return (config) => {
    if (!active) {
      console.warn(
        '[deskcrew] widgetKey (pub_...) and ticketSources are required; the plugin is idle',
      )
      return config
    }
    const collections = (config.collections || []).map((collection) => {
      const fields = bySlug.get(collection.slug)
      if (!fields) return collection
      const hooks = collection.hooks || {}
      const afterChange = Array.isArray(hooks.afterChange) ? hooks.afterChange : []
      return {
        ...collection,
        hooks: {
          ...hooks,
          afterChange: [
            ...afterChange,
            async ({ doc, operation, req }) => {
              if (operation !== 'create') return doc
              const ticket = mapEntryToTicket(doc, fields)
              if (ticket) {
                const ok = await submitTicket(opts, ticket)
                if (!ok && req && req.payload && req.payload.logger) {
                  req.payload.logger.warn(
                    `deskcrew: ticket from ${collection.slug} ${doc.id} was not accepted`,
                  )
                }
              }
              return doc
            },
          ],
        },
      }
    })
    return { ...config, collections }
  }
}

module.exports = { deskcrewPlugin, default: deskcrewPlugin }
