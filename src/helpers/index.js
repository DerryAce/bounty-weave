import Arweave from 'arweave';
import { Octokit } from "@octokit/core"

const octokit = new Octokit({ auth: "eee2df6c088fd4f4e56316d14d4d7a7a1d07ce04" });

// Since v1.5.1 you're now able to call the init function for the web version without options. The current path will be used by default, recommended.
const arweave = Arweave.init();

const APP_NAME = "bounty-weave";


export const fundIssue = async(owner, repo, issue_number, body) => {
    return  octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', { owner, repo, issue_number, body });
}


export const getFundedIssue = async (issueId, repo) => {
    let arweaveTransactions = [];

	try {
      arweaveTransactions = await arweave.arql({
		      op: "and",
			  expr1: {
			    op: "equals",
			    expr1: "repo",
			    expr2: repo
			  },
			  expr2: {
			    op: "equals",
			    expr1: "issueId",
			    expr2: issueId
			  },
			  expr3: {
			    op: "equals",
			    expr1: "appId",
			    expr2: APP_NAME
			  }
		});
	}
	catch(error) {
      console.log("unable to get bounties");
	}

	return arweaveTransactions;
}

export const getTransactionDetails = async (transactionId) => {
	let transactionDetails = null;

	try {
		transactionDetails = await arweave.transactions.get(transactionId);
	}
	catch(error) {
		console.error(error);
		console.error("unable to get transaction details");
	}

	return transactionDetails;
}




const payoutIssue = () => {

}


