echo "Linking current generator package"
npm link

echo "Creating test folder"
folder=/tmp/test-node-generator
rm -rf $folder
mkdir $folder
cd $folder
echo "Created test folder $folder"

echo "Creating local git repo"
git init
git remote add origin git@github.com:bahmutov/test-node-generator.git

echo "Running yeoman"
yo node-bahmutov --force <<EOF
@org/test-project
this is my project
key word1, another one
EOF

echo "Generator is done"
git add index.js src/*.js
echo "Files before the commit"
find . -maxdepth 2 | egrep -v node_modules | egrep -v .git
git commit -m "chore(test): this is a test commit"

ls -la
git log --oneline
git show
echo "All done testing generator"
