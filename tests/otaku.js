const anchor = require ('@project-serum/anchor');

const { SystemProgram } = anchor.web3;

const main = async() => {

  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Add your test here.
  const program = anchor.workspace.Otaku;

  //create an account keypair for our program to use
  const baseAccount = anchor.web3.Keypair.generate();

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

  await program.rpc.addGif("https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      //pubKey of user submitting gif
      signer: provider.wallet.publicKey,
    }
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString());
  
  //access gif_list on the account
  console.log("👀 GIF List", account.gifList);
  
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
