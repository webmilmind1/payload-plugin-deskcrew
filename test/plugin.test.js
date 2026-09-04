const test = require('node:test')
const assert = require('node:assert/strict')
const { deskcrewPlugin } = require('../index.js')

test('adds an afterChange hook only to listed collections and keeps existing hooks', () => {
  const plugin = deskcrewPlugin({
    widgetKey: 'pub_abc12345',
    siteUrl: 'https://x.y',
    ticketSources: [{ slug: 'contact', fields: { email: 'email', message: 'message' } }],
  })
  const existing = async () => 'kept'
  const out = plugin({
    collections: [{ slug: 'contact', hooks: { afterChange: [existing] } }, { slug: 'posts' }],
  })
  assert.equal(out.collections[0].hooks.afterChange.length, 2)
  assert.equal(out.collections[0].hooks.afterChange[0], existing)
  assert.equal(out.collections[1].hooks, undefined)
})

test('idle without a key: config returned untouched', () => {
  const cfg = { collections: [{ slug: 'contact' }] }
  assert.equal(
    deskcrewPlugin({ widgetKey: 'bad', siteUrl: 'https://x.y', ticketSources: [] })(cfg),
    cfg,
  )
})

test('hook ignores updates and returns the doc', async () => {
  const plugin = deskcrewPlugin({
    widgetKey: 'pub_abc12345',
    siteUrl: 'https://x.y',
    ticketSources: [{ slug: 'contact', fields: { email: 'email', message: 'message' } }],
  })
  const out = plugin({ collections: [{ slug: 'contact' }] })
  const hook = out.collections[0].hooks.afterChange[0]
  const doc = { id: 1, email: 'a@b.c', message: 'hi' }
  assert.equal(await hook({ doc, operation: 'update', req: {} }), doc)
})
