function! ddc_cmdline_history#get(max) abort
  let type = getcmdtype()
  return map(range(1, min([a:max, histnr(type)])),
        \ { _, val -> histget(type, val) })
endfunction
