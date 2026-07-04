function! ddc_cmdline_history#get(max) abort
  const type = getcmdtype()
  const limit = min([a:max, histnr(type)])
  if limit < 1
    return []
  endif

  let histories = range(1, limit)->map({ _, val -> histget(type, -val) })

  " Filter
  const compltype = getcmdcompltype()
  if compltype ==# 'dir'
    let histories = histories
          \ ->filter({ _, val -> isdirectory(val) })
  elseif compltype ==# 'file'
    let histories = histories
          \ ->filter({ _, val -> isdirectory(val) || filereadable(val) })
  endif

  return histories
endfunction
