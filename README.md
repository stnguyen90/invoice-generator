# Invoice Generator

This app allows users:

- create invoices
- send them to clients
- keep track of unpaid invoices

## Prerequisites

### Appwrite

1. Appwrite version 1.5 or above
2. [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation)

### App

1. Node version 18 or above

## Getting Started

### Appwrite

The following steps use the [Appwrite CLI](https://appwrite.io/docs/tooling/command-line/installation) to set up Appwrite.

1. Create a project via the Appwrite Console and take note of the project ID
2. Copy the `appwrite.template.json` to `appwrite.json`
3. Replace the `<YOUR_PROJECT_ID>` placeholder with your project ID
4. Deploy the collections:
   1. `appwrite deploy collection --all --yes`
5. Deploy the buckets:
   1. `appwrite deploy bucket --all --yes`
6. 1. Create an API Key and take note of the secret (make sure to replace `<YOUR_PROJECT_ID>` in the following command)
   1. `appwrite projects createKey --projectId <YOUR_PROJECT_ID> --name "Functions" --scopes documents.read documents.write files.read files.write users.read users.write targets.read targets.write messages.write`
7. Deploy the functions:
   1. `appwrite deploy function --all --yes`

### App

1. Install dependencies
   1. `npm i`
2. Start the dev server
   1. `npm run dev`
