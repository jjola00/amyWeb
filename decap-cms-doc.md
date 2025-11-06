1. Install Decap CMS
A static admin folder contains all Decap CMS files, stored at the root of your published site. Where you store this folder in the source files depends on your static site generator. Here’s the static file location for a few of the most popular static site generators:

These generators	store static files in
Jekyll, GitBook	/ (project root)
Hugo, Gatsby, Nuxt 2, Gridsome, Zola, Sapper, SvelteKit	/static
Next, Nuxt 3, Astro	/public
Hexo, Middleman, Jigsaw	/source
Wyam	/input
Pelican	/content
Spike	/views
VuePress	/.vuepress/public
Elmstatic	/_site
11ty	/_site
preact-cli	/src/static
Docusaurus	/static
MkDocs	/site
Lume	/_site
If your generator isn’t listed here, you can check its documentation, or as a shortcut, look in your project for a css or images folder. The contents of folders like that are usually processed as static files, so it’s likely you can store your admin folder next to those. (When you’ve found the location, feel free to add it to these docs by filing a pull request!)

Inside the admin folder, you’ll create two files:

admin
 ├ index.html
 └ config.yml
The first file, admin/index.html, is the entry point for the Decap CMS admin interface. This means that users navigate to yoursite.com/admin/ to access it. On the code side, it’s a basic HTML starter page that loads the Decap CMS JavaScript file.

The second file, admin/config.yml, is the heart of your Decap CMS installation, and a bit more complex. The Configuration section covers the details.

In this example, we pull the admin/index.html file from a public CDN.

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
In the code above the script is loaded from the unpkg CDN. Should there be any issue, jsDelivr can be used as an alternative source. Simply set the src to https://cdn.jsdelivr.net/npm/decap-cms@^3.0.0/dist/decap-cms.js

Installing with npm
You can also use Decap CMS as an npm module. Wherever you import Decap CMS, it automatically runs, taking over the current page. Make sure the script that imports it only runs on your CMS page.

First install the package and save it to your project:

npm install decap-cms-app --save
Then import it (assuming your project has tooling for imports):

import CMS from "decap-cms-app";
// Initialize the CMS object
CMS.init();
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate("my-template", MyTemplate);1. Install Decap CMS
A static admin folder contains all Decap CMS files, stored at the root of your published site. Where you store this folder in the source files depends on your static site generator. Here’s the static file location for a few of the most popular static site generators:

These generators	store static files in
Jekyll, GitBook	/ (project root)
Hugo, Gatsby, Nuxt 2, Gridsome, Zola, Sapper, SvelteKit	/static
Next, Nuxt 3, Astro	/public
Hexo, Middleman, Jigsaw	/source
Wyam	/input
Pelican	/content
Spike	/views
VuePress	/.vuepress/public
Elmstatic	/_site
11ty	/_site
preact-cli	/src/static
Docusaurus	/static
MkDocs	/site
Lume	/_site
If your generator isn’t listed here, you can check its documentation, or as a shortcut, look in your project for a css or images folder. The contents of folders like that are usually processed as static files, so it’s likely you can store your admin folder next to those. (When you’ve found the location, feel free to add it to these docs by filing a pull request!)

Inside the admin folder, you’ll create two files:

admin
 ├ index.html
 └ config.yml
The first file, admin/index.html, is the entry point for the Decap CMS admin interface. This means that users navigate to yoursite.com/admin/ to access it. On the code side, it’s a basic HTML starter page that loads the Decap CMS JavaScript file.

The second file, admin/config.yml, is the heart of your Decap CMS installation, and a bit more complex. The Configuration section covers the details.

In this example, we pull the admin/index.html file from a public CDN.

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
In the code above the script is loaded from the unpkg CDN. Should there be any issue, jsDelivr can be used as an alternative source. Simply set the src to https://cdn.jsdelivr.net/npm/decap-cms@^3.0.0/dist/decap-cms.js

Installing with npm
You can also use Decap CMS as an npm module. Wherever you import Decap CMS, it automatically runs, taking over the current page. Make sure the script that imports it only runs on your CMS page.

First install the package and save it to your project:

npm install decap-cms-app --save
Then import it (assuming your project has tooling for imports):

import CMS from "decap-cms-app";
// Initialize the CMS object
CMS.init();
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate("my-template", MyTemplate);

2. Choosing a Backend
Now that you have your Decap CMS files in place and configured, all that’s left is to enable authentication.

To follow this guide, you need a Netlify account. If you don’t have one, you can sign up for free.

You can learn about other authentication options in the Backends doc.

Setup on Netlify
Netlify offers a built-in authentication service called Identity. In order to use it, connect your site repo with Netlify. Netlify has published a general Step-by-Step Guide for this, along with detailed guides for many popular static site generators.

If you will use Netlify only for authentication, you can skip the above mentioned deployment step.

Enable Identity and Git Gateway
Netlify’s Identity and Git Gateway services allow you to manage CMS admin users for your site without requiring them to have an account with your Git host or commit access on your repo. From your site dashboard on Netlify:

Go to Integrations > Identity > Netlify Identity - Enable, click Enable Identity, and go to Configuration and usage.
Under Registration, select Open or Invite only. In most cases, you want only invited users to access your CMS, but if you’re just experimenting, you can leave it open for convenience.
If you’d like to allow one-click login with services like Google and GitHub, check the boxes next to the services you’d like to use, under External providers.
Scroll down to Services > Git Gateway, and click Enable Git Gateway. This authenticates with your Git host and generates an API access token. In this case, we’re leaving the Roles field blank, which means any logged in user may access the CMS. For information on changing this, check the Netlify Identity documentation.
Add the Netlify Identity Widget
With the backend configured to handle authentication, now you need a frontend interface to connect to it. The open source Netlify Identity Widget is a drop-in widget made for just this purpose. To include the widget in your site, add the following script tag in one or two places, depending on the method you choose for user registration:

<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
Site-wide registration
Add the script to the <head> of your CMS index page at /admin/index.html, as well as the <head> of your site’s main index page. Depending on how your site generator is set up, this may mean you need to add it to the default template, or to a “partial” or “include” template. If you can find where the site stylesheet is linked, that’s probably the right place. Alternatively, you can include the script in your site using Netlify’s Script Injection feature.

When a user logs in with the Netlify Identity widget, an access token directs to the site homepage. In order to complete the login and get back to the CMS, redirect the user back to the /admin/ path. To do this, add the following script before the closing body tag of your site’s main index page:

<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
Admin-only registration
If you use the invite-only registration, you don’t need to add the identity widget to the index page. Instead, you can invite users from the Netlify dashboard. To make this work you have to update email templates in the Netlify dashboard. Follow this guide to learn how to do it. The important part is to change the URLs from {{ siteURL }}/#... to {{ siteURL }}/admin/#.... That way all links in emails will point to the CMS page, which includes the identity widget. This method is good for performance of your frontend, because it doesn’t load the identity widget on the main page.

3. Configure Decap CMS
Configuration is different for every site, so we’ll break it down into parts. Add all the code snippets in this section to your admin/config.yml file.

Backend
We’re using Netlify for our hosting and authentication in this tutorial, so backend configuration is fairly straightforward.

For GitHub and GitLab repositories, you can start your Decap CMS config.yml file with these lines:

backend:
  name: git-gateway
  branch: main # Branch to update (optional; defaults to master)
(For Bitbucket repositories, use the Bitbucket backend instructions instead.)

The configuration above specifies your backend protocol and your publication branch. Git Gateway is an open source API that acts as a proxy between authenticated users of your site and your site repo. (We’ll get to the details of that in the Authentication section below.) If you leave out the branch declaration, it defaults to master.

Media and Public Folders
Decap CMS allows users to upload images directly within the editor. For this to work, the CMS needs to know where to save them. If you already have an images folder in your project, you could use its path, possibly creating an uploads sub-folder, for example:

# This line should *not* be indented
media_folder: "images/uploads" # Media files will be stored in the repo under images/uploads
If you’re creating a new folder for uploaded media, you’ll need to know where your static site generator expects static files. You can refer to the paths outlined above in App File Structure, and put your media folder in the same location where you put the admin folder.

Note that the media_folder file path is relative to the project root, so the example above would work for Jekyll, GitBook, or any other generator that stores static files at the project root. However, it would not work for Hugo, Hexo, Middleman, or others that store static files in a subfolder. Here’s an example that could work for a Hugo site:

# These lines should *not* be indented
media_folder: "static/images/uploads" # Media files will be stored in the repo under static/images/uploads
public_folder: "/images/uploads" # The src attribute for uploaded media will begin with /images/uploads
The configuration above adds a new setting: public_folder. Whereas media_folder specifies where uploaded files are saved in the repo, public_folder indicates where they are found in the published site. Image src attributes use this path, which is relative to the file where it’s called. For this reason, we usually start the path at the site root, using the opening /.

Note: If public_folder is not set, Decap CMS defaults to the same value as media_folder, adding an opening / if one is not included.

Collections
Collections define the structure for the different content types on your static site. Since every site is different, the collections settings differ greatly from one site to the next.

Let’s say your site has a blog, with the posts stored in _posts/blog, and files saved in a date-title format, like 1999-12-31-lets-party.md. Each post begins with settings in yaml-formatted front matter, like so:

---
layout: blog
title: "Let's Party"
date: 1999-12-31 11:59:59 -0800
thumbnail: "/images/prince.jpg"
rating: 5
---
This is the post body, where I write about our last chance to party before the Y2K bug destroys us all.
Given this example, our collections settings would look like this in your Decap CMS config.yml file:

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "_posts/blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - { label: "Layout", name: "layout", widget: "hidden", default: "blog" }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Featured Image", name: "thumbnail", widget: "image" }
      - { label: "Rating (scale of 1-5)", name: "rating", widget: "number" }
      - { label: "Body", name: "body", widget: "markdown" }
Let’s break that down:

name	Post type identifier, used in routes. Must be unique.
label	What the admin UI calls the post type.
folder	Where files of this type are stored, relative to the repo root.
create	Set to true to allow users to create new files in this collection.
slug	Template for filenames. {{year}}, {{month}}, and {{day}} pulls from the post's date field or save date. {{slug}} is a URL-safe version of the post's title. Default is simply {{slug}}.
fields	Fields listed here are shown as fields in the content editor, then saved as front matter at the beginning of the document (except for body, which follows the front matter). Each field contains the following properties:
label: Field label in the editor UI.
name: Field name in the document front matter.
widget: Determines UI style and value data type (details below).
default (optional): Sets a default value for the field.
As described above, the widget property specifies a built-in or custom UI widget for a given field. When a content editor enters a value into a widget, that value is saved in the document front matter as the value for the name specified for that field. A full listing of available widgets can be found in the Widgets doc.

Based on this example, you can go through the post types in your site and add the appropriate settings to your Decap CMS config.yml file. Each post type should be listed as a separate node under the collections field. See the Collections reference doc for more configuration options.

Filter
The entries for any collection can be filtered based on the value of a single field. The example collection below only shows post entries with the value en in the language field.

collections:
  - name: "posts"
    label: "Post"
    folder: "_posts"
    filter:
      field: language
      value: en
    fields:
      - { label: "Language", name: "language" }

4. Access Your Content
Your site CMS is now fully configured and ready for login!

If you set your registration preference to “Invite only,” invite yourself (and anyone else you choose) as a site user. To do this, select the Identity tab from your site dashboard, and then select the Invite users button. Invited users receive an email invitation with a confirmation link. Clicking the link will take you to your site with a login prompt.

If you left your site registration open, or for return visits after confirming an email invitation, access your site’s CMS at yoursite.com/admin/.

Note: No matter where you access Decap CMS — whether running locally, in a staging environment, or in your published site — it always fetches and commits files in your hosted repository (for example, on GitHub), on the branch you configured in your Decap CMS config.yml file.

This means:

Content fetched in the admin UI matches the content in the repository, which may be different from your locally running site.
Content saved using the admin UI saves directly to the hosted repository, even if you’re running the UI locally or in staging.