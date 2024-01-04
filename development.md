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
   rm -rf ../metaapi-metastats-javascript-sdk-examples/docs &&
   if [ -d docs ]; then cp -r docs ../metaapi-metastats-javascript-sdk-examples; fi &&
   rm -rf ../metaapi-metastats-javascript-sdk-examples/examples &&
   if [ -d examples ]; then cp -r examples ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f .gitignore ]; then cp .gitignore ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f .npmignore ]; then cp .npmignore ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f MANIFEST.in ]; then cp MANIFEST.in ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f LICENSE ]; then cp LICENSE ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f readme.md ]; then cp readme.md ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f README.rst ]; then cp README.rst ../metaapi-metastats-javascript-sdk-examples; fi &&
   if [ -f changelog.md ]; then cp changelog.md ../metaapi-metastats-javascript-sdk-examples; fi
10. Tag examples repository and push to main
