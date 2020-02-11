const core = require('@actions/core');
const github = require('@actions/github');
var urbanantics = require('@urbanantics/environme/src/environme');

try {

  console.log(process.env);

  // `path` input defined in action metadata file
  const path = core.getInput('path');
  console.log(`Path ${path}`);

  const branchMapping = core.getInput('branchMapping');
  console.log(branchMapping);

  const outputVariables = core.getInput('outputVariables');
  console.log(outputVariables);

  const branchName  = process.env.GITHUB_HEAD_REF;
  console.log(`branchName: ${branchName}!!`);

  // `targetEnvironment` input defined in action metadata file
  var targetEnvironment = core.getInput('targetEnvironment');
  console.log(`targetEnvironment IN ${targetEnvironment}!`);

  targetEnvironment = targetEnvironment || urbanantics.mapBranches();
  console.log(`targetEnvironment after mapping ${targetEnvironment}!`);

  var flatObj = urbanantics.environMe(path, targetEnvironment, true);

  if(outputVariables) {
    for(const key in flatObj){
      console.log(`Writing env ${process.env.key}: ${flatObj[key]}`)
      process.env[key] = flatObj[key];
    }
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}