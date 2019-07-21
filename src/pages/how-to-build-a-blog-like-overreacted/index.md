---
title: How to Build a Blog Like Overreacted
date: '2019-07-21'
spoiler: Remix to stand on the shoulders of giants.
---

I've long admired [Dan Abramov's blog](https://overreacted.io) probably like many React and Gatsby enthusiasts. We have all mined valuable gems from his writing. His website reflects his skill level. Built in [Gatsby](https://gatsbyjs.org) it features impressive features like a translation system that allows his community to contribute translations of his articles through Github. In my remix of his blog I've actually removed a lot of translation code because I don't anticipate needing it.

The [source code for his blog](https://github.com/gaearon/overreacted.io) has a generous MIT License. Sensibly he copyrights his own writing, but has left his site open for us to learn from and build on top of.

## Remixing Overreacted.io in a few simple steps

1. Fork the [overreacted.io](https://github.com/gaearon/overreacted.io) Github repo to your own account.
2. Sign up for [Netlify](https://app.netlify.com/signup) using Github.
3. Connect Netlify to your fork of Overreacted and deploy.
4. Hack away.

Dan seems to deploy using [ZEIT](https://zeit.co/), which seems like it could work fine too. I do notice that the 404 page on his site doesn't work properly, probably due to configuration problems with ZEIT, whereas Netlify works literally out of the box.