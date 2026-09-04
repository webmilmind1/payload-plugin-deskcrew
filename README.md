# payload-plugin-deskcrew

![Payload documents become DeskCrew tickets](https://deskcrew.io/packages/deskcrew-payload.gif)

Turn new documents in your Payload collections into [DeskCrew](https://deskcrew.io) support tickets. List the collections your forms write to (a contact form, feedback, support requests) and every created document lands in your DeskCrew inbox with the sender's name, email and message.

DeskCrew is an AI-powered helpdesk: a support widget for your site, AI answers grounded in your knowledge base, a human approval step before anything sends, and every conversation as a ticket. You need a free DeskCrew account: https://deskcrew.io/signup

## Install

```
npm install payload-plugin-deskcrew
```

In your Payload config:

```ts
import { buildConfig } from 'payload'
import { deskcrewPlugin } from 'payload-plugin-deskcrew'

export default buildConfig({
  // ...
  plugins: [
    deskcrewPlugin({
      widgetKey: process.env.DESKCREW_WIDGET_KEY, // pub_... from Dashboard → Install
      siteUrl: 'https://www.example.com', // the site your widget runs on
      ticketSources: [
        {
          slug: 'contact-submissions',
          fields: { name: 'name', email: 'email', message: 'message' },
        },
      ],
    }),
  ],
})
```

Each document created in a listed collection becomes a ticket. Documents without an email or a message are skipped, sending never blocks the create, and the plugin changes nothing else in your config (one afterChange hook per listed collection, appended after your own).

## The widget on your frontend

The widget itself lives in the site that renders your content. Add one script tag there, or use the package for your frontend framework: https://deskcrew.io/integrations

## What the plugin sends

Only the mapped name, email and message, with your public widget key, to `https://deskcrew.io/api/widget/submit`, using `siteUrl` as the request origin. Nothing else leaves your project. Terms: https://deskcrew.io/terms. Privacy: https://deskcrew.io/privacy.

## License

MIT
