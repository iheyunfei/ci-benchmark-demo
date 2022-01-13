import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const message = core.getInput('message');

    console.log("core.getInput('message')......", '\n', message);
    console.log("core.getInput('GITHUB_TOKEN')......", '\n', process.env.AUTH_TOKEN);

    const context = github.context;
    if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
    }
    console.log("context->", "\n", context);
    const pull_request_number = context.payload.pull_request.number;
    console.log("pull_request_number", "\n", context.payload.pull_request.number);


    const octokit = github.getOctokit(process.env.AUTH_TOKEN ?? "");
    octokit.rest.pulls.createReviewComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message
    } as any)
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();