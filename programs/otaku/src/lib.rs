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

    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs += 1;
        let signer = &mut ctx.accounts.signer;

        //build struct
        let item = ItemStruct {
            gif_link: gif_link.to_string(),
            signer_address: *signer.to_account_info().key,
        };

        //add struct to `gif_list` vector
        base_account.gif_list.push(item);
        base_account.total_gifs += 1;

        Ok(())
    }
} 


#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    pub gif_list: Vec<ItemStruct>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 9000 )]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub signer: Signer<'info>, 
    pub system_program: Program<'info, System>,

}


#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub signer: Signer<'info>
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub signer_address: Pubkey,
}