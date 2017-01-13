set e+x

echo "Linking current generator package"
npm link

echo "Creating test folder"
folder=/tmp/test-node-generator
rm -rf $folder
mkdir $folder
echo "Created test folder $folder"

cp test/answers.json $folder
echo "Copied answers file answers.json to $folder"

cd $folder
echo "Changed working dir to $folder"

echo "Creating local git repo"
git init
git remote add origin git@github.com:bahmutov/test-node-generator.git

echo "Running yeoman, expect to read answers from file"
yo node-bahmutov

echo "Generator is done"
rm answers.json
git add src/*.js .gitignore .npmrc README.md package.json
echo "Files before the commit"
find . -maxdepth 2 | egrep -v node_modules | egrep -v .git
git status

git commit -m "chore(test): this is a test commit"

ls -la
git log --oneline
# git show

echo "Testing Dockerfile generation"
yo node-bahmutov:docker
git status
git add Dockerfile .dockerignore
git commit -m "chore(docker): generate Dockerfile"
git log --oneline

echo "All done testing generator in $folder"
