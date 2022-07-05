set number                                              " enable numbers on the left
set relativenumber                                      " current line is 0
set noswapfile											" no swapfile
set nobackup											" Don't create a backup when overriding a file
set autoindent tabstop=4 shiftwidth=4 softtabstop=4		" tab width
set smarttab											" tab key actions
set mouse=a                                             " enable mouse scrolling
set splitright                                          " open vertical split to the right


call plug#begin()

Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'preservim/nerdtree'
Plug 'ap/vim-css-color'
Plug 'hzchirs/vim-material'
Plug 'ryanoasis/vim-devicons'
Plug 'mhinz/vim-startify'
Plug 'ntk148v/auto-pairs'

call plug#end()

nnoremap <C-f> :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>

let g:NERDTreeDirArrowExpandable="+"
let g:NERDTreeDirArrowCollapsible="-"
