const anchor = require("@project-serum/anchor");

const main = async() => {

  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

    

    // Add your test here.
    const program = anchor.workspace.Otaku;
    const tx = await program.methods.initialize().rpc();
    console.log("📝 Your transaction signature", tx);
  
};

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
};

runMain();
