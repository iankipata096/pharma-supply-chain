const hre = require("hardhat");

async function main() {
    const contractAddress = "0xYourNewContractAddress"; // Replace with actual address
    const contract = await hre.ethers.getContractAt("PharmaOrders", contractAddress);

    console.log("✅ Connected to contract at:", contractAddress);
    const productCount = await contract.productCount();
    console.log("📦 Total Products:", productCount.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
