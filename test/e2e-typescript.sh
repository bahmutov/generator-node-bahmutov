set e+x

echo "Testing generating TypeScript Node package"

echo "Linking current generator package"
npm link

sourceFolder=$PWD

echo "Creating test folder"
folder=/tmp/test-node-generator
rm -rf $folder
mkdir $folder
echo "Created test folder $folder"

cp test/answers-typescript.json $folder/answers.json
echo "Copied answers file answers.json to $folder"

cd $folder
echo "Changed working dir to $folder"

echo "Creating local git repo"
git init
git remote add origin git@github.com:bahmutov/test-node-generator.git

echo "Running yeoman, expect to read answers from file"
DEBUG=gen yo node-bahmutov
rm answers.json
echo "Generator is done"

echo "Making a microservice"
npm i -S micro@6.1.0
cp $sourceFolder/test/index.js src/index.js
git add src/*.js .gitignore .npmrc README.md package.json
echo "Files before the commit"
find . -maxdepth 2 | egrep -v node_modules | egrep -v .git
git status

git commit -m "chore(test): this is a test commit"

ls -la
git log --oneline
# git show

echo "All done testing TypeScript generator in $folder"
