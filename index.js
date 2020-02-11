const core = require('@actions/core');
const github = require('@actions/github');
var urbanantics = require('@urbanantics/environme/src/environme');

try {

  console.log(process.env);

  // `path` input defined in action metadata file
  const path = core.getInput('path');
  console.log(`Path ${path}`);

  const branchName  = process.env.GITHUB_REF;
  console.log(`branchName: ${branchName}!!`);

  const branchMapping = core.getInput('branchMapping');
  console.log(branchMapping);

  // `targetEnvironment` input defined in action metadata file
  var targetEnvironment = core.getInput('targetEnvironment');
  console.log(`targetEnvironment IN ${targetEnvironment}!`);

  targetEnvironment = targetEnvironment || urbanantics.mapBranches(branchMapping, branchName);
  console.log(`targetEnvironment after mapping ${targetEnvironment}!`);

  urbanantics.environMe(path, targetEnvironment, true);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}