# Release checklist
1. Verify changelog.md
2. Make sure package.json version is correctly updated
3. Make sure SDK version is updated in examples
4. Update SDK version in example generator to the one that is being published
5. Make sure CI build passes
6. Run nvm use 18 && (rm -rf node_modules package-lock.json dist dists build es index.js; npm i && npm run build && npm publish)
7. Verify examples are in working condition
8. Create git tag and push it to master
9. Copy examples to public repository
   rm -rf ../metaapi-metastats-javascript-sdk-examples/examples &&
   cp -r examples ../metaapi-metastats-javascript-sdk-examples &&
   cp .gitignore ../metaapi-metastats-javascript-sdk-examples &&
   cp .npmignore ../metaapi-metastats-javascript-sdk-examples &&
   cp LICENSE ../metaapi-metastats-javascript-sdk-examples &&
   cp readme.md ../metaapi-metastats-javascript-sdk-examples
10. Tag examples repository and push to main
