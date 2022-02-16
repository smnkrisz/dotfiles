"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""               
"               
"               ██╗   ██╗██╗███╗   ███╗██████╗  ██████╗
"               ██║   ██║██║████╗ ████║██╔══██╗██╔════╝
"               ██║   ██║██║██╔████╔██║██████╔╝██║     
"               ╚██╗ ██╔╝██║██║╚██╔╝██║██╔══██╗██║     
"                ╚████╔╝ ██║██║ ╚═╝ ██║██║  ██║╚██████╗
"                 ╚═══╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝
"               
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""  

if has('filetype')
	filetype indent plugin on
endif

"Line numbers
set relativenumber number

"Highlight search results
set incsearch 

"Show matching brackets
set showmatch

"Smart indent
set si

"Cursor line
set cursorline
hi CursorLine ctermbg=8 ctermfg=15 "8 = dark gray, 15 = white
hi Cursor ctermbg=15 ctermfg=8

"Tab width
set tabstop=4

"Space instead of tabs
set expandtab

"Enable auto completion menu after pressing TAB
set wildmenu

"Make wildmenu behave like similar to Bash completion
set wildmode=list:longest

"Wildmenu will ignore files with these extensions
set wildignore=*.docx,*.jpg,*.png,*.gif,*.pdf,*.pyc,*.exe,*.flv,*.img,*.xlsx

