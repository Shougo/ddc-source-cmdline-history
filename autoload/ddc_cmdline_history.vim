function! ddc_cmdline_history#get() abort
  let type = getcmdtype()
  return map(range(1, histnr(type)), { _, val -> histget(type, val) })
endfunction
