import "./App.css";
import Web3 from "web3";
import { useEffect } from "react";
import loadContract from "./loadContract";

async function loadWeb3() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
	}
}

async function load() {
	await loadWeb3();
	window.contract = await loadContract();
	updateStatus("Ready!");
}

function updateStatus(status) {
	const statusEl = document.getElementById("status");
	statusEl.innerHTML = status;
	console.log(status);
}

async function callFucnMint() {
	updateStatus("call func");
	try {
		const account = await getCurrentAccount();
		const result = await window.contract.methods
			.mint(1)
			.send({ from: account });
		console.log(result);
	} catch (e) {
		console.error(e);
	}
	updateStatus("done");
}

async function getCurrentAccount() {
	const accounts = await window.web3.eth.getAccounts();
	return accounts[0];
}

function App() {
	useEffect(() => {
		load();
	}, []);
	return (
		<div className="App">
			Status: <span id="status">Loading...</span>
			<div>
				<button onClick={() => callFucnMint()}>Mint</button>
			</div>
		</div>
	);
}

export default App;
