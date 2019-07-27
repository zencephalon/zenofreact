---
title: how to automatically capitalize your titles in gatsby
date: '2019-07-26'
spoiler: Let JavaScript do all the work of capitalizing your titles for you.
---

After having to revise the capitalization of the title in a [previous blog post](/use-gatsby-for-ecommerce) I didn't want to deal with the problem again. Gatsby to the rescue here!

A quick Google search for `javascript title case` found me several promising JavaScript libraries. After a bit of research I settled on [titlecase](https://www.npmjs.com/package/titlecase) as the winning package.

A quick `yarn add titlecase --dev` and away we go.

I just need to update where I create posts in `gatsby-node.js` to titlecase my titles.

```diff
--- a/gatsby-node.js
+++ b/gatsby-node.js
@@ -3,7 +3,8 @@
 const Promise = require('bluebird');
 const path = require('path');
 const { createFilePath } = require('gatsby-source-filesystem');
 const { supportedLanguages } = require('./i18n');
+const { toLaxTitleCase } = require('titlecase');
 
 exports.createPages = ({ graphql, actions }) => {
   const { createPage, createRedirect } = actions;
@@ -72,14 +73,14 @@
           createPage({
             path: post.node.fields.slug,
             component: blogPost,
             context: {
               html: post.node.html,
               isPost: true,
               slug: post.node.fields.slug,
               previous,
               next,
-              frontmatter: { title, date, spoiler },
+              frontmatter: { title: toLaxTitleCase(title), date, spoiler },
               timeToRead: post.node.timeToRead,
             },
           });
```

And now I can merrily write my frontmatter like so.

```markdown
---
title: how to automatically capitalize your titles in gatsby
date: '2019-07-26'
spoiler: Let JavaScript do all the work of capitalizing your titles for you.
---
```

I always appreciate when the computer does the work for me.