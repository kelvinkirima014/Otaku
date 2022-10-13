import { web3, AnchorProvider, setProvider, workspace } from "@project-serum/anchor";

const { SystemProgram } = web3;

const main = async() => {

  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env();
  setProvider(provider);

  // Add your test here.
  const program = workspace.Otaku;

  //create an account keypair for our program to use
  const baseAccount = web3.Keypair.generate();

  //call initialize and pass it the params it requires
  let tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      signer: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount]
  })

  console.log("📝 Your transaction signature", tx);

  //fetch data from the account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  //access total_gifs
  console.log('👀 GIF Count', account.totalGifs.toString());
  
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
