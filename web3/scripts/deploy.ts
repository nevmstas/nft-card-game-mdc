import { ethers } from "hardhat";
import console from "console";

const _metadataUri = process.env.METADATA_URI;

async function deploy(name: string, ...params: [string]) {
  const contractFactory = await ethers.getContractFactory(name);

  return await contractFactory.deploy(...params).then((f) => f.deployed());
}

async function main() {
  const [admin] = await ethers.getSigners();

  console.log(`Deploying a smart contract...`);

  const MagicalDungeonCreatures = (
    await deploy("MagicalDungeonCreatures", _metadataUri as string)
  ).connect(admin);

  console.log({ MagicalDungeonCreatures: MagicalDungeonCreatures.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
