# Search Experience

Build process for different environments

```
$ HOST_URL=<your host url> DIST_PATH=<your environment dist folder> yarn build
```

From Continuous Deployment (CD) Pipleline standpoint, define/update the build stage with above ENV variables.
1. Provide the mandatory HOST_URL during build time. 
2. DIST_PATH is an optional variable. If DIST_PATH is not provided by default points to `dist` directory
