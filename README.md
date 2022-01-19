# Oviedo Lab Webside

## Attribution

This repository was forked from [Bedford Lab's jekyll repository](https://github.com/blab/blotter). We are thankful for their contributions and their willingness to make their sources freely available! See the original repo for more inspiration and information.

## Overview

This repository contains the source code needed to *generate* the site hosted at [oviedolab.org](oviedolab.org) via Github Pages. The site itself (the HTML, CSS, javascript, and static assest) are located in a [separate Github Pages repository](https://github.com/Oviedo-Lab/oviedo-lab.github.io).

The site is generated via a static site generate called [jekyll](https://jekyllrb.com), written in the [ruby](https://www.ruby-lang.org/en/) programming language. It is *not* necessary to know ruby to make modifications to the site. Some experience with HTML, CSS, and javascript will be helpful to make non-trivial modifications, but basic proficiency with [markdown](https://www.markdownguide.org/) is all that is necessary for adding content.

The basic process of updating the site is as follows:

1.) Write a new post in markdown
2.) Build the site using jekyll and preview your changes locally, commiting and pushing them upstream when you are satisfied.
3.) Push the resulting `_site` directory contents into the [Github Pages repository](https://github.com/Oviedo-Lab/oviedo-lab.github.io), making sure not to clobber the [`CNAME` file](https://github.com/Oviedo-Lab/oviedo-lab.github.io/blob/main/CNAME) in the process (which allows the site to be accessed at "oviedolab.org")


# Contribute

The instructions below apply to all platforms (Windows, MacOS, and Linux).

## A brief overview of Jekyll

Jekyll requires a number of files to generate a full site. These include, among others:

1. Basic website files, such as HTML templates, CSS files, and javascript
2. Static assets, such as PDFs, images, and videos that will appear on the website
3. [Markdown](https://www.markdownguide.org/) files that make writing the actual content for the website easy

The latter two classes of files are the easiest to approach and are all that is necessary to modify the site's content (while the former is required to edit the sites style and layout). Static assets should be kept in their respective directories (`pdfs/`, `images/`, and `video/`), while the markdown files appear in directories according to category (such as "papers", "team", "research", "misc") in a `category_name/_posts/` directory.

## Content

Markdown files just require YAML top matter that looks something like (from `papers/_posts/2011-07-20-functional-asymmetry.md`):

```
---                                                                          
layout: paper                                                                  
title: The functional asymmetry of auditory cortex is reflected in the organization of local cortical circuits
image: /images/papers/functional-asymmetry.png                                 
authors: Oviedo HV, Bureau I, Svoboda K, Zador AM                              
year: 2010                                                                     
ref: Oviedo et al. 2010. Nat Neurosci.                                         
journal: "Nat Neurosci: nn.2659"                                               
pdf: /pdfs/papers/functional-asymmetry.pdf                                     
doi: 10.1038/nn.2659                                                           
---      
```
Some notes:

 - The required YAML elements are dependent on the particular category of post. Look at the markdown of an existing post to get an idea of how things are rendered.
 - *Filenames matter*. In particular:
   - The filename should start with a date in YYYY-MM-DD format. This is used in ordering the posts; more senior team members appear first, and more recent papers appear first.
   - Following the date, each filename should contain a dash, followed by a  short, *unique* name, followed by the `.md` extension, such as `papers/_posts/2011-07-20-functional-asymmetry.md`. This short title is used in the URL of the post, so this becomes `https://oviedolab.org/papers/functional-asymmetry/`, so the short title should be long enough and unique enough not to cause conflicts with other posts.'

## For more information

* Look over the [metadata format guide](https://oviedolab.org/guide/format/)
* Look over the [Markdown style guide](https://oviedolab.org/guide/style/)

## Making changes go live

Once the site is built in the `_site` directory, the contents of that directory should be moved to the [Github Pages repository](https://github.com/Oviedo-Lab/oviedo-lab.github.io). In addition, you [*must* have a `CNAME` file](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), or the site will be visible at [oviedo-lab.github.io](oviedo-lab.github.io) instead of [oviedolab.org](oviedolab.org). If you get a 404 error, double check this.


# Windows Guide

Windows is _not_ an officially supported platform for Jekyll, but should function just fine. It requires familiarity with three tools:

- A text editor (such as Notepad++, vim, or VS Code)
- Git 
- A bash shell (typically installed as "git bash", but using MINGW64 underneath)

For CUNY Windows 10 installations, you should be looking for Notepad++ and "git bash"..

## Building the site

### Prerequisites

1. Jekyll (and its prerequisites, including ruby). See [here](https://jekyllrb.com/docs/installation/) for platform-specific instructions.
2. [Git](https://git-scm.com/download/win)
3. A javascript runtime such as [node.js](https://nodejs.org/en/download/)

Once these are installed, you can open "git bash" and run the following commands

```
# Grab the repo 
git clone https://github.com/Oviedo-Lab/oviedolab.org.git
cd oviedolab.org

# Install ruby gems
bundler install     
```

### Building the site itself

After this, the site can be be built by running the command

```
bundle exec jekyll build
```

in the root directory of this repository.

### Previewing the Site
To view the site, run `bundle exec jekyll serve` in the root directory of this repository and point a browser to `http://localhost:4000/`.  More information on Jekyll can be found [here](http://jekyllrb.com/).


# Linux Guide

## Building the site

These instructions assume a linux distribution. To build the website, you will need:

### Prerequisites

1. Jekyll (and its prerequisites, including ruby). See [here](https://jekyllrb.com/docs/installation/) for platform-specific instructions.
2. Git
3. A javascript runtime such as node.js

On Ubuntu 21.04, execute the following commands in the directory where you would like to clone this repo.

```
apt -y update

# Install nodejs repo
curl -sL https://deb.nodesource.com/setup_16.x  | bash -

# Install prereqs
apt -y install git ruby-full build-essential zlib1g-dev curl gnupg nodejs
gem install 'bundler:1.13.1' jekyll

# Grab the repo 
git clone https://github.com/Oviedo-Lab/oviedolab.org.git
cd oviedolab.org

# Install ruby gems
bundler install                                                            
```

### Building the site itself

After this, the site can be be built with:

```
bundle exec jekyll build
```

### Previewing the site

To view the site, run `bundle exec jekyll serve` and point a browser to `http://localhost:4000/`.  More information on Jekyll can be found [here](http://jekyllrb.com/).


# License (from [bedford.io](http://bedford.io))

All source code in this repository, consisting of files with extensions `.html`, `.css`, `.less`, `.rb` or `.js`, is freely available under an MIT license, unless otherwise noted within a file. You're welcome to borrow / repurpose code to build your own site, but I would very much appreciate attribution and a link back to [bedford.io](http://bedford.io) from your `about` page.

**The MIT License (MIT)**

Copyright (c) 2013-2019 Trevor Bedford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
