import Arweave from 'arweave';
import { Octokit } from "@octokit/core"

const octokit = new Octokit({ auth: "eee2df6c088fd4f4e56316d14d4d7a7a1d07ce04" });

// Since v1.5.1 you're now able to call the init function for the web version without options. The current path will be used by default, recommended.
const arweave = Arweave.init();


export const fundIssue = async(owner, repo, issue_number, body) => {
    return  octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', { owner, repo, issue_number, body });
}


const payoutIssue = () => {

}


