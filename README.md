

```yaml
# .github/workflows/ci.yml

name: CI Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

-----

### 1\. `name`

This is the name of your workflow. It's what you'll see on the "Actions" tab in your GitHub repository. It's optional, but highly recommended for clarity.

**Example:**

```yaml
name: CI/CD Pipeline for Production
```

-----

### 2\. `on`

This defines the **events** that will trigger the workflow to run. This is one of the most powerful features.

**Types & Examples:**

  * **Push or Pull Request**: The most common triggers. You can filter by branches or paths.
    ```yaml
    on:
      push:
        branches: [ "main", "develop" ] # Runs on push to main or develop
      pull_request:
        paths: [ "src/**" ] # Runs on PR if files in the src/ folder change
    ```
  * **Scheduled Events**: Runs the workflow on a schedule using cron syntax.
    ```yaml
    on:
      schedule:
        - cron: '30 5 * * 1' # Runs at 5:30 AM every Monday
    ```
  * **Manual Trigger (`workflow_dispatch`)**: Allows you to run the workflow manually from the Actions tab. You can even define input fields.
    ```yaml
    on:
      workflow_dispatch:
        inputs:
          logLevel:
            description: 'Log level'
            required: true
            default: 'warning'
            type: choice
            options:
            - info
            - warning
            - debug
    ```

-----

### 3\. `jobs`

A workflow run is made up of one or more **jobs**, which run in parallel by default. Each job runs in a fresh environment on a runner.

**Example:**

```yaml
jobs:
  build:
    # ... build job configuration ...
  test:
    # ... test job configuration ...
```

-----

### 4\. `runs-on`

This specifies the type of machine, or **runner**, to run the job on.

**Types & Examples:**

  * **GitHub-Hosted Runners**:
      * `ubuntu-latest` (most common)
      * `windows-latest`
      * `macos-latest`
  * **Self-Hosted Runners**: If you have your own machines configured as runners.
    ```yaml
    runs-on: self-hosted
    ```

-----

### 5\. `steps`

A **step** is an individual task that can run commands or use an action. Steps are executed in order within a job.

**Types & Examples:**

  * **Using an Action (`uses`)**: This is the most common type of step. It uses a pre-built, reusable unit of code from the GitHub Marketplace or another repository. The `actions/checkout@v4` action, for example, checks out your repository's code onto the runner.
    ```yaml
    steps:
      - name: Checkout repository code
        uses: actions/checkout@v4
    ```
  * **Running a Command (`run`)**: Executes command-line programs using the runner's shell. You can have single-line or multi-line scripts.
    ```yaml
    steps:
      - name: Install dependencies
        run: npm install

      - name: Run build and test
        run: |
          npm run build
          npm test
    ```
  * **`name`**: A descriptive name for the step, which is shown in the logs.
    ```yaml
    steps:
      - name: "Step 1: Install project dependencies"
        run: npm install
    ```

-----

### 6\. `with`

This provides input parameters to an action specified with `uses`. The available parameters are defined by the action's creator.

**Example:**
For the `actions/setup-node@v4` action, you can specify which version of Node.js to install.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm' # Another parameter to cache npm dependencies
```

-----

### 7\. `env`

This sets **environment variables** for a workflow, a job, or a single step.

**Example:**

```yaml
env:
  NODE_ENV: production # Available to all jobs and steps

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      API_KEY: ${{ secrets.MY_API_KEY }} # Available only to the build job
    steps:
      - name: Run a script
        run: echo "The API key is $API_KEY"
```