# ddc-source-cmdline-history

Command history completion for ddc.vim

This source collects candidates from histget(). It is useful for command line
completion.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
call ddc#custom#patch_global('sources', ['cmdline-history'])

" Change source options
call ddc#custom#patch_global('sourceOptions', {
      \ 'cmdline-history': {'mark': 'history'},
      \ })
```
