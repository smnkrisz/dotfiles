set number

call plug#begin()

Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'https://github.com/preservim/nerdtree'

call plug#end()

nnoremap <C-f> :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>

let g:NERDTreeDirArrowExpandable="+"
let g:NERDTreeDirArrowCollapsible="-"
