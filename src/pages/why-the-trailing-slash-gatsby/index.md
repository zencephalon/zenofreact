---
title: Why Does Gatsby Use a Trailing Slash?
date: '2019-07-24'
spoiler: Trailing slashes, removing the slashes, redirecting, and the pain.
---

After using Gatsby for a while one can't help but stumble over [someone wondering about the trailing slash](https://www.reddit.com/r/gatsbyjs/comments/c907g6/q_on_the_forced_trailing_on_urls_redirects_whats/), or writing [an issue about the trailing slash](https://github.com/gatsbyjs/gatsby/issues/9207
), and even brilliant engineers like [Dan Abramov have gotten confused](https://twitter.com/dan_abramov/status/1085162944156131330) by URLs and redirects in Gatsby.

Clearly the trailing slash bothers people. Some people prefer the way URLs look without the trailing slash at the end. One might prefer no trailing slashes when migrating to Gatsby from another system that didn't use trailing slashes, to avoid SEO problems from migrating to a new link scheme.

Almost since the beginning Gatsby has had the [gatsby-plugin-remove-trailing-slashes](https://www.gatsbyjs.org/packages/gatsby-plugin-remove-trailing-slashes/) plugin, so clearly the team has thought about the problem. It can seem unclear what that plugin actually does, and why Gatsby defaults to including the slash anyway.

## Why does Gatsby use the trailing slash by default?

Short answer: in order to target out of the box compatibility with the most web servers possible, while still presenting attractive URLs.

I believe the Gatsby team picked the defaults that they did to minimize the configuration users would need to do on their web servers to get Gatsby working, but without totally sacrificing aesthetics. In order to understand that perpsective, let's examine some options that Gatsby didn't go with.

### Using bare file names (imaginary)

Imagine if Gatsby had created links that look like `/some-folder/index.html` or `/some-page.html`. I think most of us would agree these URLs don't look great in this day and age. I still encounter websites that use URL schemas like this, for example [my father's website](https://learninfreedom.org/) which has existed since the 90s.

This sort of URL actually has the most out of the box compatibility with web servers of all sorts. Serving these files would require no additional configuration on the most popular web servers. However, they definitely give a dated feel and don't appear very popular in 2019.

### No slash URLs, using files (imaginary)

By default `gatsby build` generates a `public` folder containing files like `some-page/index.html` and `some-other-page/index.html` while generating URLs that look like `/some-page/` and `/some-other-page/`.

One could imagine that instead Gatsby might generate files like `some-page.html` and `some-other-page.html` and links like `/some-page` and `/some-other-page`.

The problem? Web servers don't do this out of the box. For instance on Apache we'd have to write a rewrite rule like:

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d          # is not directory
RewriteCond %{REQUEST_FILENAME}\.html -f     # is an existing html file
RewriteRule ^(.*)$ $1.html                   # rewrite index to index.html
```

This doesn't even completely solve our problem because with only that configuration both `/some-page.html` and `/some-page` will direct to the page, and for SEO purposes we really only want `/some-page` to work. In order to fix that we would have to add another rule like:

```
# Redirects domain.com/file.html to domain.com/file
RewriteCond %{REQUEST_FILENAME} !-d       # is not directory
RewriteCond %{REQUEST_FILENAME}\.html -f  # is an existing html file
RewriteCond %{REQUEST_URI} ^(.+)\.html$   # request URI ends with .html
RewriteRule (.*)\.html$ /$1 [R=301,L]     # redirect from index.html to index
```

Which all seems like rather a hassle.

### No slash URLs, using folder indexes

Gatsby works this way when using the [gatsby-plugin-remove-trailing-slashes](https://www.gatsbyjs.org/packages/gatsby-plugin-remove-trailing-slashes/). I actually run [my personal wiki](https://zencephalon.com) this way, but it does take configuration. I have the following rule setup in nginx:

```
rewrite ^/([^/.]+)$ /$1/index.html break;
```

It works fine for me, but I feel comfortable with both nginx configuration and regular expressions. The actual details of how to do this vary from server to server and some hosts, such as Cloudfront/S3 on AWS make it [quite a bit more challenging](https://github.com/gatsbyjs/gatsby/issues/9207#issuecomment-479359403).

I personally don't plan to try removing the slash on Netlify, because their rewrite system comes with a list of caveats that I'd rather avoid for now.

## Summary

Gatsby's default behavior gives us decent looking URLs with the advantage that it works out of the box with most web servers' default rules on searching for an `index` file when loading directories. It seems like a sensible default to me, although I acknowledge that overriding it can cause pain and confusion. That pain and confusion comes more from the differing configurations of each web server, and if Gatsby removed the slash by default it would force more people to deal with the web server configurations directly. As it stands, a large percentage of people can simply use Gatsby without worrying about setting up rewrite rules on their web server.