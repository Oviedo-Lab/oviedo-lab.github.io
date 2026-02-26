# Oviedo Lab Website

This is the source code for the [oviedolab.org](https://oviedolab.org) website. The webpage is built using [SvelteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/), with [Bun](https://bun.sh/) as the JavaScript runtime and package manager. The webpage components are built on top of the [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) UI library.

Continous integration and deployment is set up using GitHub Actions with a custom Workflow that builds the website and deploys it to GitHub Pages on every push to the `main` branch.

## Development

### Prerequisites
To set up this project on a new machine, first install the required runtimes and dependencies:

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Bun](https://bun.sh/install)
3. Install [Rust](https://www.rust-lang.org/tools/install) and [wasm-pack](https://github.com/drager/wasm-pack/) (for WebAssembly components)


### Installation
Then, clone the repository and install the dependencies:

1. Clone the repository: 

```bash
git clone https://github.com/Oviedo-Lab/oviedo-lab.github.io.git
```

2. Install the dependencies:

```bash
cd oviedo-lab.github.io
bun install
```

### Development Branch
**Please do not work directly on the `main` branch**. Accidentally pushing to `main` can trigger the deployment workflow and cause downtime for the website.

Instead, create a new branch, or use the dev branch for development.
```bash
# Create a new branch for your work
git checkout -b your-branch-name

# Or switch to the dev branch for ongoing development
git checkout dev

# Or create a new branch from dev for your own work
git checkout -b your-branch-name dev
```

Then, work on your branch and push your changes to the remote repository.
```bash
# After making changes, add and commit them
git add .
git commit -m "Your commit message"

# You can push your branch to the remote repository as needed
git push origin your-branch-name
```

When your changes are ready, create a pull request to merge your branch into `main`. Optionally, if the changes are small enough and that is the agreed upon workflow, you can merge your branch into `main` directly without a pull request.
```bash
# Push your branch to the remote repository
git push origin your-branch-name

# Create a pull request on GitHub to merge your branch into main
...

# Or merge your branch into main directly if that is the agreed upon workflow
git checkout main # Switch to main branch
git merge your-branch-name # Merge your branch into main
git push origin main # Push the updated main branch to the remote repository
```

Again, note that after merging your changes into `main` and pushing them to the remote repository (GitHub), the deployment workflow will be triggered and the website will be updated with your changes.

Finally, after changes are merged and deployed, you can delete your development branch if it is no longer needed.
```bash
# Delete your development branch locally
git branch -d your-branch-name

# Delete your development branch from the remote repository
git push origin --delete your-branch-name
```


### Running the development server
To run the development server, use the following command:

```bash
bun run dev

# To expose the server to other devices on your network, use the following command:
bun run dev --host
```

This will start the development server and open the website in your default browser. The server will automatically hot reload the page when you make changes to the source code.

**Note:** The first time you run the development server or the build command, it will take some time for the program to generate optimized versions of website's assets (images, videos, etc.). These optimizations are cached in the `node_modules\.cache\imagetools\` and will be reused on subsequent runs. Because of this, when running the development server for the first time, navigating the website will be less responsive.


### Compile and Preview the Production Build
To compile the website for production and preview it locally, use the following commands:
```bash
# Compile the website for production
bun run build

# Start a local http server to preview the production build
bun run preview 

# Or, build and preview in one command
bun run build && bun run preview
```
The preview script utilizes the [`http-server`](https://www.npmjs.com/package/http-server) package to serve the production build locally. By default, it will be available at `http://localhost:22222`.



## Deployment
After testing the production build locally, you can deploy the website by merging your changes into the `main` branch and pushing to the remote repository. This will trigger the GitHub Actions workflow to build and deploy the website to GitHub Pages.

```bash
# Remember to commit and push changes to your branch first!
git add .
git commit -m "Your commit message"
git push origin your-branch-name

# Then, create a pull request to merge your branch into main
...

# Or, merge your branch into main directly if that is the agreed upon workflow
git checkout main # Switch to main branch
git merge your-branch-name # Merge your branch into main
git push origin main # Push the updated main branch to the remote repository
```
You can then go to the GitHub repository's "Actions" tab ([here](https://github.com/Oviedo-Lab/oviedo-lab.github.io/actions/)) to monitor the progress of the deployment workflow. Once the workflow is complete, which should take less than 5 minutes, the website will be updated with your changes and available at [https://oviedolab.org](https://oviedolab.org).