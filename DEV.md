# npm-react-typescript-template

A template for publishing a React + TypeScript package to npm


## 


## How to make the example working

Because we want to import the package, as it is in npm (and not with a relative path)
we need to link the root project, containing msal-react-tester, to the example.

``` bash
cd /example

# Install all required packages for the example
npm i
# Then link the project on level up in the folder tree (containing package.json form msal-react-tester)
npm link "../"

# confirm "msal-react-tester" is a link "extraneous"
npm ls

├── @azure/msal-react@1.4.2
├── @fluentui/react@8.77.3
├── @testing-library/jest-dom@5.16.4
├── @testing-library/react@12.1.5
├── @testing-library/user-event@13.5.0
├── @types/jest@26.0.24
├── @types/node@14.18.21
├── @types/react-dom@17.0.17
├── @types/react@17.0.47
├── msal-react-tester@1.0.0 extraneous -> ./..
├── react-dom@17.0.2
├── react-router-dom@6.3.0
├── react-scripts@5.0.1
├── react@17.0.2
├── typescript@4.7.4
└── web-vitals@1.1.2

```

