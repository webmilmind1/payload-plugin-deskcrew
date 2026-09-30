<!-- deskcrew-header:start -->
<p align="center">
  <a href="https://deskcrew.io"><img src="https://deskcrew.io/logo.png" alt="DeskCrew" width="96" height="96"></a>
</p>

<h1 align="center">payload-plugin-deskcrew</h1>

<p align="center"><b>Plugin for Payload-powered sites</b></p>

<p align="center">New documents in chosen collections, such as contact forms and feedback, become DeskCrew support tickets through one afterChange hook per collection.</p>

<p align="center">
  <a href="https://deskcrew.io"><b>Website</b></a> •
  <a href="https://deskcrew.io/integrations"><b>Integrations</b></a> •
  <a href="https://deskcrew.io/agents"><b>For agents</b></a> •
  <a href="https://deskcrew.io/signup"><b>Sign up</b></a>
</p>

<p align="center">
  <a href="https://github.com/webmilmind1/payload-plugin-deskcrew/stargazers"><img src="https://img.shields.io/github/stars/webmilmind1/payload-plugin-deskcrew?style=flat&logo=github&label=Stars&color=ffd33d" alt="GitHub stars"></a>
  <a href="https://github.com/webmilmind1/payload-plugin-deskcrew"><img src="https://img.shields.io/github/license/webmilmind1/payload-plugin-deskcrew?style=flat&label=License&color=e3a82b" alt="License"></a>
</p>

<p align="center">
  <a href="https://deskcrew.io"><img src="https://img.shields.io/badge/Visit_our_website-6366F1?style=for-the-badge&logoColor=white" alt="Visit our website"></a>
  <a href="https://discord.gg/hdWZgrYDqB"><img src="https://img.shields.io/badge/Join_our_Discord-5865F2?style=for-the-badge&logoColor=white&logo=discord" alt="Join our Discord"></a>
  <a href="https://x.com/getdeskcrew"><img src="https://img.shields.io/badge/Follow_%40getdeskcrew-000000?style=for-the-badge&logoColor=white&logo=x" alt="Follow @getdeskcrew"></a>
  <a href="https://whop.com/deskcrew/"><img src="https://img.shields.io/badge/Join_us_on_Whop-FF6243?style=for-the-badge&logoColor=white" alt="Join us on Whop"></a>
</p>

<p align="center"><i>⭐ Help more people find DeskCrew. Star this repo!</i></p>
<!-- deskcrew-header:end -->

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
