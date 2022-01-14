import * as core from "@actions/core";
import * as github from "@actions/github";
import fs from "fs";
import { execSync } from "child_process"

function get_number() {
  if (process.env.GITHUB_EVENT_PATH) {
    const ev = JSON.parse(
      fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
    )
    const prNum = ev.pull_request.number
    return prNum;
  }
  return
}


async function post_comment(token: string, body: string, owner: string, repo: string, pullnumber: number | string) {
  const cmd = `curl -s -H "Authorization: token ${token}" -X POST -d '{"body": "${body}"}' "https://api.github.com/repos/${owner}/${repo}/issues/${pullnumber}/comments"`;
  execSync(cmd);
}

async function run() {
  try {
    const token = "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"
    const octokit = github.getOctokit(token);
    const owner = "zhusjfaker";
    const repo = "ci-benchmark-demo";
    // const res = await octokit.rest.pulls.list({ owner, repo });
    // const pull_number = res?.data?.[0]?.number;
    const pull_number = get_number();
    console.log("pull_number->", pull_number);
    if (pull_number) {
      post_comment(token, "test demo comment", owner, repo, pull_number);
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();