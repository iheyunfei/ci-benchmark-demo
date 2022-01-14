import * as core from "@actions/core";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";

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
  const res = execSync(cmd);
  console.log("upload comment res -> \n", res.toString("utf8"));
}

async function run() {
  try {
    const token = "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"
    const owner = "zhusjfaker";
    const repo = "ci-benchmark-demo";
    // const octokit = github.getOctokit(token);
    // const res = await octokit.rest.pulls.list({ owner, repo });
    // const pull_number = res?.data?.[0]?.number;
    const benchmark_file = path.resolve(process.cwd(), "output.txt");
    if (fs.existsSync(benchmark_file)) {
      const content = fs.readFileSync(benchmark_file, { encoding: "utf8" });
      const pull_number = get_number();
      if (pull_number) {
        post_comment(token, content, owner, repo, pull_number);
      }
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();