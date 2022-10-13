use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod otaku {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        //Get a reference to the account
        let base_account = &mut ctx.accounts.base_account;
        //initialize total_gifs
        base_account.total_gifs = 0;
        Ok(())
    }
} 

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 9000 )]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub signer: Signer<'info>, 
    pub system_program: Program<'info, System>,

}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
}