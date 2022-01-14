import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("token");

    console.log("token----->", '\n', token);
    const octokit = github.getOctokit(token);
    const res = await octokit.rest.pulls.list();
    console.log(res);
    console.log(".....")
    // octokit.rest.pulls.createReviewComment({
    //   ...context.repo,
    //   issue_number: pull_request_number,
    //   body: message
    // } as any)
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();