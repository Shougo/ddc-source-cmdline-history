function! ddc_cmdline_history#get(max) abort
  let type = getcmdtype()
  let max = min([a:max, histnr(type)])
  if max < 1
    return []
  endif
  return map(range(1, max),
        \ { _, val -> histget(type, - val) })
endfunction
