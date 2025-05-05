const hre = require("hardhat");

async function main() {
    const PharmaOrders = await hre.ethers.getContractFactory("PharmaOrders");
    const pharmaOrders = await PharmaOrders.deploy();

    await pharmaOrders.waitForDeployment();
    console.log(`PharmaOrders contract deployed to: ${pharmaOrders.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
