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

  const branchName  = process.env.GITHUB_HEAD_REF;
  console.log(`branchName: ${branchName}!!`);

  // `targetEnvironment` input defined in action metadata file
  const targetEnvironment = core.getInput('targetEnvironment');
  console.log(`targetEnvironment ${targetEnvironment}!`);

  urbanantics.environMe(path, targetEnvironment, true);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}