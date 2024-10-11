import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { JettonDex } from "./output/sample_JettonDex"; // Adjust to match your compiled contract output path

(async () => {
    // Initialize TON client
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Contract owner address (update with the actual owner address used during deployment)
    const owner = Address.parse("0QDSnDLpBrEhO-ikEp87DUYuudvmCEDULRotKkTEGueEQKRP");

    // Initialize the contract to get the deployed address
    const jettonAAddress = Address.parse("kQBl3a1PmbQ2Op2CwkwtjR6EyjgABEUkKICs2MEfltccl-jK");  // Replace with actual Jetton A address
    const jettonBAddress = Address.parse("EQBwDBkgvnK7fNFWaLB2zl0pfYROJ8wo1G2jfJXP2iXrfebC");  // Replace with actual Jetton B address
    const init = await JettonDex.init(owner, jettonAAddress, jettonBAddress);
    const contract_address = contractAddress(0, init);

    // Log the contract address
    console.log("Reading Contract Info...");
    console.log(contract_address.toString());

    // Instantiate the contract and open it with the client
    const contract = await JettonDex.fromAddress(contract_address);
    const contract_open = await client.open(contract);
    
    try {
        const jettonABalance = await contract_open.getGetJettonABalance();
        console.log("Jetton A Balance: " + jettonABalance);
        
        const jettonBBalance = await contract_open.getGetJettonBBalance(); // Use correct method name
        console.log("Jetton B Balance: " + jettonBBalance);
    } catch (error) {
        console.error("Failed to get balance:", error);
    }
})();

